import mainReducer from "../reducer";
import loginReducer from "../reducer/loginReducer";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  login: loginReducer,
  reducer: mainReducer,
});

export default store;
