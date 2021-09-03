import cartActionTypes from './cart.types'

const INITIAL_STATE = {
  cartItemCount: 0,
  cartItems: []
}
const productReducer = (state = INITIAL_STATE, action: { type: string; payload: object }) => {
  switch(action.type){
    // case productActionTypes.TOGGLE_PRODUCT_SIZE:
    //   return{
    //     ...state,
    //     hidden: !state.hidden
    //   }
    // case productActionTypes.SET_CHOSEN_PRODUCT:
    //   return{
    //     ...state,
    //     hidden: true,
    //     chosenVariantProduct: null,
    //     chosenProduct: action.payload
    //   }
    // case productActionTypes.SET_CHOSEN_VARIANT_PRODUCT:
    //   return{
    //     ...state,
    //     hidden: true,
    //     chosenVariantProduct: action.payload
    //   }
    // case productActionTypes.SET_DROP_PRODUCTS_START:
    //   return{
    //     ...state,
    //     isFetching: true
    //   }
    // case productActionTypes.SET_DROP_PRODUCTS_SUCCESS:
    //   return{
    //     ...state,
    //     isFetching: false,
    //     products: action.payload
    //   }
    // case productActionTypes.SET_DROP_PRODUCTS_FAILURE:
    //   return{
    //     ...state,
    //     isFetching: false,
    //     errorMessage: action.payload
    //   }
    default:
      return state;
  }
}

export default cartReducer;