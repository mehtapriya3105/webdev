import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/AssignmentReducer";
import coursesReducer from "./Courses/reducer";
import enrollmentReducer from "./enrollmentReducer";


const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    coursesReducer,
    enrollmentReducer
  },
});
export default store;