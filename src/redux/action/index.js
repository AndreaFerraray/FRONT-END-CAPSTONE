export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_ROLE = "ADD_ROLE";
export const ADD_USER = "ADD_USER";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const ADD_CAMPEGGIO = "ADD_CAMPEGGIO";
export const ADD_BOOKING = "ADD_BOOKING";
export const ADD_ADDRESS = "ADD_ADDRESS";
export const REMOVE_ADDRESS = "REMOVE_ADDRESS";
export const LOGOUT_USER = "LOGOUT_USER";
export const ADD_FILTER = "ADD_FILTER";
export const RESET_FILTERS = "RESET_FILTERS";

export const addToken = (token) => ({ type: ADD_TOKEN, payload: token });
export const addRole = (role) => ({ type: ADD_ROLE, payload: role });
export const addUser = (user) => ({ type: ADD_USER, payload: user });
export const addFavoriteButton = () => ({ type: ADD_FAVORITE });
export const removeFavoriteButton = () => ({ type: REMOVE_FAVORITE });
export const addCampeggio = (campeggio) => ({ type: ADD_CAMPEGGIO, payload: campeggio });
export const addBooking = (campeggio) => ({ type: ADD_BOOKING, payload: campeggio });
export const addIndirizzo = (indirizzo) => ({ type: ADD_ADDRESS, payload: indirizzo });
export const removeIndirizzo = () => ({ type: REMOVE_ADDRESS });
export const addFilter = (filterOptions) => ({ type: ADD_FILTER, payload: filterOptions });
export const resetFilters = () => ({ type: RESET_FILTERS });

export const addFavorite = (campeggioId, token) => {
  return async (dispatch) => {
    try {
      const risp = await fetch("http://localhost:3001/users/addFavorite/me", {
        method: "POST",
        body: JSON.stringify(campeggioId),
        headers: { Authorization: "Bearer " + token, "content-type": "Application/json" },
      });
      const user = await risp.json();
      if (risp.ok) {
        dispatch(addUser(user));
        dispatch(addFavoriteButton());
      } else {
        throw new Error(user.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const removeFavorite = (campeggioId, token) => {
  return async (dispatch) => {
    try {
      const risp = await fetch("http://localhost:3001/users/deleteFavorite/me", {
        method: "DELETE",
        body: JSON.stringify(campeggioId),
        headers: { Authorization: "Bearer " + token, "content-type": "Application/json" },
      });
      const user = await risp.json();
      if (risp.ok) {
        dispatch(addUser(user));
        dispatch(removeFavoriteButton());
      } else {
        throw new Error(user.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getCampeggio = (campeggioId, token) => {
  return async (dispatch) => {
    try {
      const risp = await fetch(`http://localhost:3001/campeggi/${campeggioId}`, {
        method: "GET",

        headers: { Authorization: "Bearer " + token, "content-type": "Application/json" },
      });
      const campeggio = await risp.json();
      dispatch(addCampeggio(campeggio));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};
