import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {

    enrollments: enrollments,
};
const enrollSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollement: (state, { payload: enrollInfo }) => {
            const newEnrollement: any = {
                _id: uuidv4(),
                user: enrollInfo.user,
                courses: enrollInfo.courses,
            };
            state.enrollments = [...state.enrollments, newEnrollement] as any;
            console.log("After adding", state.enrollments);
        },
        deleteEnrollement: (state, { payload: enrollementId }) => {
            state.enrollments = state.enrollments.filter(
                (en: any) => en._id !== enrollementId);
            console.log("After deleting", state.enrollments);
        },

    },
},
);
export const { addEnrollement, deleteEnrollement } =
    enrollSlice.actions;
export default enrollSlice.reducer;

