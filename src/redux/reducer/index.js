const initialStateCount = {
  cart: {
    content: [],
    count: 0,
  },
};

const mainReducer = (state = initialStateCount, action) => {
  switch (action.type) {
    case "INCREMENTA":
      return {
        ...state,
        cart: {
          ...state.cart,
          count: state.cart.count + 1,
        },
      };
    case "DECREMENTA":
      return state - 1;
    //inseiramo i vari casi, per i diversi type con cui l'action arrivera tramite Dispatch()
    default:
      return state;
  }
};
export default mainReducer;
