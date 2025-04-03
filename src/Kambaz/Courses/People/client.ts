import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const fetchAllEnrollments = async () => {
    const { data } = await axios.get(ENROLLMENTS_API);
    return data;
};

export const fetchAllEnrolledStudents = async (courseId: string) => {
    const { data } = await axios.get(`${REMOTE_SERVER}/api/enrollments/people/${courseId}`);
    return data;
};
export const deleteEnrollment = async (enrollmentId: string) => {
    const response = await axios.delete(`${ENROLLMENTS_API}/${enrollmentId}`);
    return response.data;
};
export const createNewEnrollment = async (enrollment: any) => {
    const response = await axios.post(`${ENROLLMENTS_API}/create`, enrollment);
    return response.data;
};

