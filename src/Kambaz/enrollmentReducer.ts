import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },
        unenroll: (state, { payload: { user, course } }) => {
            console.log("Before unenroll:", user, course);
            
            state.enrollments = state.enrollments.filter((e) =>
                !(e.course === course._id && e.user === user._id)
            );
            console.log("After unenroll:", JSON.stringify(state.enrollments, null, 2));

        },
        enroll: (state, { payload: { user, course } }) => {
            const newEnrollment =
            {
                _id: uuidv4(),
                user: user._id,
                course: course._id
            }
            state.enrollments = [...state.enrollments, newEnrollment]
        },
    },
});

export const { unenroll, enroll, setEnrollments } =
    enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;