import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isAdminOrFaculty = currentUser.role === "FACULTY" || currentUser.role === "ADMIN";
  if (isAdminOrFaculty) {
   return  children;
  } else {
    return <Navigate to="" />;
}}
