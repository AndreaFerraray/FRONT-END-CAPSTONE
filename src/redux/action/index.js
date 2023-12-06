export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_ROLE = "ADD_ROLE";
export const ADD_USER = "ADD_USER";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const INCREMENTA = "INCREMENTA";
export const DECREMENTA = "DECREMENTA";

export const addToken = (token) => ({ type: ADD_TOKEN, payload: token });
export const addRole = (role) => ({ type: ADD_ROLE, payload: role });
export const addUser = (user) => ({ type: ADD_USER, payload: user });
export const addFavorite = (campeggio) => ({ type: ADD_FAVORITE, payload: campeggio });
export const removeFavorite = (campeggio) => ({ type: removeFavorite.FAVORITE, payload: campeggio });
