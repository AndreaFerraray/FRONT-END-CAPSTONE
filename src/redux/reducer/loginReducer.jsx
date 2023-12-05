import { ADD_ROLE, ADD_TOKEN, ADD_USER } from "../action";

const initialState = {
  token: "",
  role: "",
  user: null,
  nome: "",
  cognome: "",
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case ADD_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload,
      };
    //aggiungi i vari casi di login e come salvare il token per averlo disponibile ovunque e comunque per le richiesta al backend
    default:
      return state;
  }
};
export default loginReducer;
