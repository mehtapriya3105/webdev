import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ASSIGNMENT_API = `${REMOTE_SERVER}/api/assignments`;

export const findAssignmentForCourse = async (courseId: string) => {
    const response = await axios
      .get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
  };
  

export const fetchAllAssignments = async () => {
  const { data } = await axios.get(ASSIGNMENT_API);
  return data;
};

export const deleteAssignment = async (id: string) => {
    const { data } = await axios.delete(`${ASSIGNMENT_API}/${id}`);
    return data;
  };
  
  export const updateAssignment = async (assignment: any) => {
    
    const { data } = await axios.put(`${ASSIGNMENT_API}/${assignment._id}`, assignment);
    return data;
  };
  
  export const createNewAssignment = async (assignment: any) => {
    const response = await axios.post(`${ASSIGNMENT_API}/create`, assignment);
    return response.data;
};

  
  