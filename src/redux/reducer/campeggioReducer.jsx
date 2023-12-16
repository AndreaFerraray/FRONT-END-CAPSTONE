import { ADD_ADDRESS, ADD_BOOKING, ADD_CAMPEGGIO } from "../action";

const initialState = {
  campeggio: null,
  indirizzoCercato: null,
};

const campeggioReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAMPEGGIO:
      return {
        ...state,
        campeggio: action.payload,
      };
    case ADD_BOOKING:
      return {
        ...state,
        campeggio: {
          ...state.campeggio,
          ...action.payload.campeggio,
        },
      };
    case ADD_ADDRESS:
      return {
        ...state,
        indirizzoCercato: action.payload,
      };

    default:
      return state;
  }
};
export default campeggioReducer;
