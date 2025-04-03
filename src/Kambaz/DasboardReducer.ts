import { createSlice } from "@reduxjs/toolkit";
import { courses } from "./Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  courses: courses,
};
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: Course }) => {
        const newCourse: any = {
          _id: uuidv4(),
          name: Course.name,
          number: Course.number,
          startDate: Course.startDate,
          endDate: Course.endDate,
          department: Course.department,
          credits: Course.credits,
          description: Course.description,
        };
        state.courses = [...state.courses, newCourse] as any;
    },      
    deleteCourse: (state, { payload: CourseId }) => {
      state.courses = state.courses.filter(
        (c: any) => c._id !== CourseId);
    },
    updateCourse: (state, { payload : { course }}) => {
      state.courses = state.courses.map((c) => {
              if (c._id === course._id) {
                  return course;
              } else {
                  return c;
              }
          })
  },
    editCourse: (state, { payload: CourseId }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === CourseId ? { ...c, editing: true } : c
      ) as any;
    },
  },
});
export const { addCourse, deleteCourse, updateCourse, editCourse } =
coursesSlice.actions;
export default coursesSlice.reducer;