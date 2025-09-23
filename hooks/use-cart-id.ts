import { useCookies } from 'react-cookie';

const CART_ID_COOKIE = 'cartId';

export type CartIdHook = {
  cartId: string | null;
  setCartId: (cartId: string) => void;
};

export const useCartId = (): CartIdHook => {
  const [{ cartId = null }, setCookie] = useCookies([CART_ID_COOKIE]);
  
  const setCartId = (cartId: string) => {
    setCookie(CART_ID_COOKIE, cartId, { path: '/' });
  }

  return { cartId, setCartId };
};