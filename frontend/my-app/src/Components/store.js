import rootReducer from "../reducers/index";
import { configureStore } from "@reduxjs/toolkit";

export function makestore() {
  return configureStore({
    reducer: rootReducer,
  });
}
const store = makestore();
export default store;
