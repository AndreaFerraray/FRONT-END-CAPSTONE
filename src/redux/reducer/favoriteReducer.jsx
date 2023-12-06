import { ADD_FAVORITE } from "../action";
const initialState = {
  numeroPreferiti: 0,
  preferiti: [],
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        preferiti: [...state.preferiti, action.payload],
        numeroPreferiti: state.numeroPreferiti + 1,
      };

    default:
      return state;
  }
};

export default favoriteReducer;
