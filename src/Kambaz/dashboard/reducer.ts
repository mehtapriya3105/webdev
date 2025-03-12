import { createSlice } from "@reduxjs/toolkit";
import { courses, enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  courses: courses,
  enrollments : enrollments,
};
const cousesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: courses }) => {
      const newCourse: any = {
        _id: uuidv4(),
        name : courses.name,
        number : courses.number,
        startDate : courses.startDate,
        endDate : courses.endDate,
        credits : courses.credits,
        description : courses.description
      };
      const newEnrollement : any = {
        _id: uuidv4(),
        user: courses.user,
        course: newCourse._id,
      }
      state.courses = [...state.courses, newCourse] as any;
      state.enrollments = [...state.enrollments, newEnrollement] as any;
      console.log("After adding", state.courses);
      console.log("After adding", state.enrollments);
    },
    deleteCourse: (state, { payload: cousreId }) => {
    
      state.courses = state.courses.filter(
        (c: any) => c._id !== cousreId);
        console.log("After deleting", state.courses);
    },
    updateCourse: (state, { payload: cousreId }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === cousreId? cousreId : c
      ) as any;
    },
    editCourse: (state, { payload: course }) => {
      console.log("Edit couse", course);
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? { ...c, ...course } : c
      );
      console.log("Updated courses", state.courses);
    },
  },
});
export const { addCourse, deleteCourse, updateCourse, editCourse } =
cousesSlice.actions;
export default cousesSlice.reducer;

