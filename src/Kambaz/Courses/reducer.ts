import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";

const initialState = {
    courses: courses,
};
const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        addNewCourse: (state, { payload: { course }}) => {
            state.courses = [...state.courses, course] as any;
        },
        deleteCourse: (state, { payload : { courseId }}) => {
            state.courses = (state.courses.filter((course) => course._id !== courseId));
        },
        updateCourse: (state, { payload : { course }}) => {
            state.courses = state.courses.map((c) => {
                    if (c._id === course._id) {
                        return course;
                    } else {
                        return c;
                    }
                })
        }
    },
});

export const { addNewCourse, deleteCourse, updateCourse } =
    coursesSlice.actions;

export default coursesSlice.reducer;