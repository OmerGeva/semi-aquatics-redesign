import styles from './PrivacyPolicyPage.module.scss';

const PrivacyPolicyPage: React.FC = () => (
  <div className={styles.privacyPolicyContainer}>
    <h1>Privacy Policy</h1>
    <p><strong>Last Updated:</strong> [Insert Date]</p>
    <p>
      At Semi Aquatics, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and manage your information when you visit our website or interact with our services. By using our website, you agree to the terms of this Privacy Policy.
    </p>

    <h2>1. General Information</h2>
    <p>
      Semi Aquatics is operated by [Insert Official Business Name], [Insert Business Type, e.g., Delaware C Corporation]. The business is registered in [Insert Address or City, State, Country]. Semi Aquatics is an e-commerce platform designed to offer high-quality, sleek, and minimal wardrobe staples in limited quantities. Our collections prioritize sustainability by reducing fashion-related waste.
    </p>

    <h2>2. Information We Collect</h2>
    <h3>Shopify-Handled Data:</h3>
    <p>
      Shopify processes all transactional data, including name, email, shipping address, and payment details. Semi Aquatics does not store this data directly. For more information, refer to <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer">Shopify's Privacy Policy</a>.
    </p>
    <h3>Cart Identification:</h3>
    <p>
      A unique cart ID is stored in a browser cookie to manage and identify your shopping cart.
    </p>
    <h3>Subscription Data:</h3>
    <p>
      When users subscribe to updates, their email addresses are stored and managed via Omnisend. For more information, refer to <a href="https://www.omnisend.com/privacy/" target="_blank" rel="noopener noreferrer">Omnisend's Privacy Policy</a>.
    </p>
    <h3>Analytics and Marketing Data:</h3>
    <ul>
      <li>
        <strong>Google Analytics:</strong> Tracks website activity and performance. Learn more in their <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
      </li>
      <li>
        <strong>ATTN.TV Script:</strong> Collects data for targeted advertising and tracking. Refer to <a href="https://www.attn.tv/privacy" target="_blank" rel="noopener noreferrer">ATTN.TV’s Privacy Policy</a>.
      </li>
    </ul>

    <h2>3. How We Use Your Information</h2>
    <ul>
      <li><strong>Order Fulfillment:</strong> Shopify processes orders, including payment and shipping details.</li>
      <li><strong>Shopping Cart Management:</strong> A unique cart ID stored in cookies helps manage and identify your shopping cart.</li>
      <li><strong>Email Marketing:</strong> Subscription data is used for sending updates and promotional material via Omnisend.</li>
      <li><strong>Website Analytics and Performance:</strong> Google Analytics tracks user interactions to improve the website experience and performance.</li>
      <li><strong>Advertising and Targeting:</strong> The ATTN.TV script collects data for advertising and retargeting purposes.</li>
    </ul>

    <h2>4. Data Storage and Retention</h2>
    <h3>Data Storage Locations:</h3>
    <p>User data is stored and processed by third-party services:</p>
    <ul>
      <li><strong>Shopify:</strong> Manages transactional data, stored on Shopify’s secure servers. For more details, see their <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</li>
      <li><strong>Omnisend:</strong> Stores email subscription data on their secure servers as outlined in their <a href="https://www.omnisend.com/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</li>
      <li><strong>Google Analytics:</strong> Processes website activity data on Google’s servers. For more information, see their <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</li>
      <li><strong>ATTN.TV:</strong> Manages advertising and targeting data as specified in their <a href="https://www.attn.tv/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</li>
    </ul>
    <h3>Data Retention:</h3>
    <ul>
      <li><strong>Transaction Data:</strong> Retained by Shopify for as long as necessary to fulfill orders and comply with legal obligations (e.g., tax reporting).</li>
      <li><strong>Shopping Cart Data:</strong> The unique cart ID stored in cookies is retained for [Insert Reasonable Duration, e.g., "up to 30 days"] or until the user clears their cookies.</li>
      <li><strong>Email Subscription Data:</strong> Retained by Omnisend until the user unsubscribes or requests deletion.</li>
      <li><strong>Analytics and Advertising Data:</strong> Retention periods are determined by Google Analytics and ATTN.TV. For details, consult their privacy policies.</li>
    </ul>

    <h2>5. Your Rights</h2>
    <ul>
      <li>
        <strong>Opt-Out of Marketing Emails:</strong> You can unsubscribe from marketing emails at any time by clicking the "unsubscribe" link in any email or contacting us directly.
      </li>
      <li>
        <strong>Access, Correction, or Deletion:</strong> For transactional data managed by Shopify, you can request access, correction, or deletion of your personal data by contacting us at [Insert Contact Information]. We will facilitate your request with Shopify, subject to legal obligations.
      </li>
      <li><strong>Cookies Management:</strong> You can manage and delete cookies through your browser settings.</li>
    </ul>

    <h2>6. Policy Updates</h2>
    <p>
      We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal obligations. Any changes will be posted on this page, and the "Last Updated" date at the top of this Privacy Policy will be revised accordingly.
    </p>
    <p>
      We encourage you to review this page periodically to stay informed about how we protect your data.
    </p>

    <p>
      For any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:info@semiaquatics.com">info@semiaquatics.com</a>.
    </p>
  </div>
);

export default PrivacyPolicyPage;
