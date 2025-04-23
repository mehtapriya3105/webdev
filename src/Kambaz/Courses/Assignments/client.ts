import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ASSIGNMENT_API = `${REMOTE_SERVER}/api/assignments`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const findAssignmentForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials
    .get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const fetchAllAssignments = async () => {
  const { data } = await axiosWithCredentials.get(ASSIGNMENT_API);
  return data;
};

export const deleteAssignment = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${ASSIGNMENT_API}/${id}`);
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.put(`${ASSIGNMENT_API}/${assignment._id}`, assignment);
  return data;
};

export const createNewAssignment = async (assignment: any) => {
  const response = await axiosWithCredentials.post(`${ASSIGNMENT_API}/create`, assignment);
  return response.data;
};