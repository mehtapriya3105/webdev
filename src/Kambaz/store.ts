import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./courses/modules/reducer";
import accountReducer from "./accounts/reducer";
import assignmentsReducer from "./courses/assignments/reducer";
import coursesReducer from "./dashboard/reducer";



const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    coursesReducer,

  },
});
export default store;

