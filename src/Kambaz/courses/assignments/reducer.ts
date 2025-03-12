import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  assignments: assignments,
};
const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assingment }) => {
      const newAssignment: any = {
        _id: uuidv4(),
        title: assingment.title,
        course: assingment.course,
        due_date : assingment.due_date,
        points: assingment.points,
        available_from : assingment.available_from,
        available_until : assingment.available_until,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
      console.log("After adding", state.assignments);
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
    
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId);
        console.log("After deleting", state.assignments);
    },
    updateAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId? assignmentId : a
      ) as any;
    },
    editAssignemnt: (state, { payload: assignment }) => {
      console.log("Edit assignment", assignment);
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? { ...a, ...assignment } : a
      );
      console.log("Updated assignments", state.assignments);
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignemnt } =
assignmentSlice.actions;
export default assignmentSlice.reducer;

