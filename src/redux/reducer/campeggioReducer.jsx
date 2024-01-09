import { ADD_ADDRESS, ADD_BOOKING, ADD_CAMPEGGIO, ADD_FILTER, REMOVE_ADDRESS, RESET_FILTERS } from "../action";

const initialState = {
  campeggio: null,
  indirizzoCercato: null,
  campeggiFiltrati: {
    wifi: false,
    animaliAmmessi: false,
    piscina: false,
    animazione: false,
    market: false,
    ristorante: false,
  },
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
    case REMOVE_ADDRESS:
      return {
        ...state,
        indirizzoCercato: action.payload,
      };
    case ADD_FILTER:
      return {
        ...state,
        campeggiFiltrati: action.payload,
      };
    case RESET_FILTERS:
      return {
        ...state,
        campeggiFiltrati: {
          wifi: false,
          animaliAmmessi: false,
          piscina: false,
          animazione: false,
          market: false,
          ristorante: false,
        },
      };

    default:
      return state;
  }
};
export default campeggioReducer;
