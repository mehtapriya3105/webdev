import {Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from './Navigation';
import Modules from './Modules';
import Home from './Home';
import Assignments from './Assignments';
import AssignmentEditor from './Assignments/Editor';
import PeopleTable from './People/Table';
import Quizzes from './Quizzes';
import Zoom from './Zoom';
import Piazza from './Piazza';
import AssignmentEditorViewOnly from "./Assignments/AssignmentEditorViewOnly";
import { Navigate } from "react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Settings from "../Settings";
import * as assignmentClient from "./Assignments/client";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === Number(cid)); 
  const { pathname } = useLocation();
  const currentSection = pathname.split("/")[4];

  const [assignments, setAssignments] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const addNewAssignment = async (assignment: any) => {
    const newAssignment = await assignmentClient.createNewAssignment(assignment);
    setAssignments([...assignments, newAssignment]);
    return newAssignment;
  };

  const deleteAssignment = async (assignmentId: any) => {
    const status = await assignmentClient.deleteAssignment(assignmentId);
    setAssignments(assignments.filter((assignment) => assignment._id !== assignmentId));
    return status;
  };

  const fetchAssignments = async () => {
    try {
      const fetchedAssignments = await assignmentClient.fetchAllAssignments();
      // console.log(fetchedAssignments);
      setAssignments(fetchedAssignments);
      return fetchedAssignments;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [currentUser]);

  const updateAssignment = async (assignment: any) => {
    const updatedAssignment = await assignmentClient.updateAssignment(assignment);
    setAssignments(assignments.map((c) => {
      if (c._id === assignment._id) {
        return updatedAssignment || assignment;
      } else {
        return c;
      }
    }));
    return updatedAssignment;
  };

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.title} &gt; {currentSection}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
        <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="Modules" element={<Modules />} />
                <Route path="Piazza" element={<Piazza />} />
                <Route path="Zoom" element={<Zoom/>} />
                <Route path="Assignments" element={
                  <Assignments 
                    assignments={assignments} 
                    createNewAssignment={addNewAssignment} 
                    deleteAssignment={deleteAssignment} 
                    updateAssignment={updateAssignment} 
                    fetchAssignment={fetchAssignments} 
                  />
                } />
                <Route path="Assignments/:aid" element={
                  <AssignmentEditor 
                    updateAssignment={updateAssignment} 
                    fetchAssignment={fetchAssignments}
                  />
                } />
                <Route path="Assignments/:aid/EditAssignment" element={
                  <AssignmentEditorViewOnly 
                    updateAssignment={updateAssignment}
                    fetchAssignment={fetchAssignments}
                  />
                } />
                <Route path="Quizzes" element={<Quizzes />} />
                <Route path="People" element={<PeopleTable />} />
                <Route path="Settings" element={<Settings />} />
                <Route path="AssignmentEditor" element={
                  <AssignmentEditor 
                  createNewAssignment={addNewAssignment} 
                    fetchAssignment={fetchAssignments}
                  />
                } />
              </Routes>
        </div>
      </div>
    </div>
  );
}