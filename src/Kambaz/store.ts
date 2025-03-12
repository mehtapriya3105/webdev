import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./courses/modules/reducer";
import accountReducer from "./accounts/reducer";
import assignmentsReducer from "./courses/assignments/reducer";
import coursesReducer from "./dashboard/reducer";
import enrollementReducer from "./dashboard/enrollementReducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    coursesReducer,
    enrollementReducer
  },
});
export default store;

