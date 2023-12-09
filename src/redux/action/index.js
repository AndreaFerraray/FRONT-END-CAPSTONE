export const ADD_TOKEN = "ADD_TOKEN";
export const ADD_ROLE = "ADD_ROLE";
export const ADD_USER = "ADD_USER";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

export const addToken = (token) => ({ type: ADD_TOKEN, payload: token });
export const addRole = (role) => ({ type: ADD_ROLE, payload: role });
export const addUser = (user) => ({ type: ADD_USER, payload: user });
export const addFavoriteButton = () => ({ type: ADD_FAVORITE });
export const removeFavoriteButton = () => ({ type: REMOVE_FAVORITE });

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
