export const getCartCounts = (cart: any) => {
  if (!cart || !cart.data || !cart.data.cart || !cart.data.cart.lines) return {};
  const res: any = {}
  cart.data.cart.lines.edges.forEach((li: any) => {
    res[li.node.merchandise.id] = li.node.quantity
  });

  return res;
}

export const merchandiseIdToLineItemId = (cart: any, merchandiseId: string) => {
  if (!cart || !cart.cart || !cart.cart.lines) return null;
  const lineItem = cart.cart.lines.edges.find((li: any) => li.node.merchandise.id === merchandiseId);

  return lineItem.node.id;
}

export const determineLineItemsDifferent = (cart: any, res: any): boolean => {
  const modifiedCartObj: any = {}
  const modifiedResObj: any = {}
  cart.data.cart.lines.edges.forEach((li: any) =>
    modifiedCartObj[li.node.merchandise.id] = li.node.quantity
  )
  return false;
}
