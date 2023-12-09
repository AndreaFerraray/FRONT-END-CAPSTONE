import { ADD_FAVORITE, ADD_ROLE, ADD_TOKEN, ADD_USER, REMOVE_FAVORITE } from "../action";

const initialState = {
  token: "",
  user: null,
  isButtonClicked: false,
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case ADD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        numeroPreferiti: state.numeroPreferiti + 1,
        isButtonClicked: true,
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        numeroPreferiti: state.numeroPreferiti - 1,
        isButtonClicked: false,
      };
    //aggiungi i vari casi di login e come salvare il token per averlo disponibile ovunque e comunque per le richiesta al backend
    default:
      return state;
  }
};
export default loginReducer;
