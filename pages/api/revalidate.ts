import type { NextApiRequest, NextApiResponse } from 'next';

// Simple on-demand revalidation endpoint
// Usage examples:
//   POST /api/revalidate?token=YOUR_TOKEN           -> revalidate /shop
//   POST /api/revalidate?token=YOUR_TOKEN&paths=/shop,/faq
// Optional header: x-revalidate-token: YOUR_TOKEN (if you prefer headers)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const tokenFromHeader = req.headers['x-revalidate-token'];
  const tokenFromQuery = req.query.token;
  const providedToken = Array.isArray(tokenFromHeader)
    ? tokenFromHeader[0]
    : (tokenFromHeader as string) || (Array.isArray(tokenFromQuery) ? tokenFromQuery[0] : (tokenFromQuery as string));

  if (!process.env.REVALIDATE_TOKEN) {
    return res.status(500).json({ message: 'REVALIDATE_TOKEN env var not configured' });
  }

  if (providedToken !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const results: Record<string, string> = {};

    // 1) Explicit paths via query (?paths=/a,/b)
    const pathsParam = req.query.paths;
    if (typeof pathsParam === 'string' && pathsParam.trim().length > 0) {
      const paths = pathsParam.split(',').map((p) => (p.startsWith('/') ? p : `/${p}`));
      for (const path of paths) {
        try {
          await res.revalidate(path);
          results[path] = 'revalidated';
        } catch (err) {
          results[path] = 'failed';
        }
      }
    }

    // 2) Shopify webhooks: products/collections
    const shopifyTopic = (req.headers['x-shopify-topic'] as string) || '';

    // Body may be parsed JSON if sent as application/json
    const body: any = req.body || {};

    if (shopifyTopic.includes('products/')) {
      const productId = body?.id || body?.product?.id;
      if (productId) {
        const path = `/shop/${productId}`;
        try {
          await res.revalidate(path);
          results[path] = 'revalidated';
        } catch (err) {
          results[path] = 'failed';
        }
      }
      // also refresh listing page
      try {
        await res.revalidate('/shop');
        results['/shop'] = 'revalidated';
      } catch (err) {
        results['/shop'] = 'failed';
      }
    } else if (shopifyTopic.includes('collections/')) {
      try {
        await res.revalidate('/shop');
        results['/shop'] = 'revalidated';
      } catch (err) {
        results['/shop'] = 'failed';
      }
    }

    // 3) Default: if nothing specified, refresh /shop to be safe
    if (Object.keys(results).length === 0) {
      try {
        await res.revalidate('/shop');
        results['/shop'] = 'revalidated';
      } catch (err) {
        results['/shop'] = 'failed';
      }
    }

    return res.json({ revalidated: true, results, topic: shopifyTopic || null });
  } catch (err: any) {
    return res.status(500).json({ message: err?.message || 'Error revalidating' });
  }
}
