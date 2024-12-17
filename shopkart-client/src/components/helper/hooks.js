function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        products: state.products.some((item) => item._id === action.payload._id)
          ? state.products.map((item) =>
              item._id === action.payload._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.products, { ...action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: state.products.filter(
          (item) => item._id !== action.payload._id
        ),
      };

    case "UPDATE_PRODUCT_COUNT":
      return {
        ...state,
        products: state.products.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
}

export default reducer;