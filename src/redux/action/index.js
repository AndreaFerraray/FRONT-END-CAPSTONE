export const incrementa = () => {
  return {
    type: "INCREMENTA",
  };
};

export const decrementa = () => {
  return {
    type: "DECREMENTA",
  };
};

export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_ROLE = "ADD_ROLE";
export const ADD_USER = "ADD_USER";

export const addToken = (token) => ({ type: ADD_TOKEN, payload: token });
export const addRole = (role) => ({ type: ADD_ROLE, payload: role });
export const addUser = (user) => ({ type: ADD_USER, payload: user });
