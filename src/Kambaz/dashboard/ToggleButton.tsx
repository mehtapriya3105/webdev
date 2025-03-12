import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addEnrollement, deleteEnrollement } from "./reducer";

const ToggleButton = ({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}) => {
  const dispatch = useDispatch();

  const enrollments = useSelector(
    (state: any) => state.coursesReducer.enrollments
  );
  console.log(enrollments)
  const isInitiallyEnrolled = enrollments.some(
    (enrollment: { user: string; course: string }) =>
      enrollment.user === userId && enrollment.course === courseId
  );

  const [isToggled, setIsToggled] = useState(isInitiallyEnrolled);

  useEffect(() => {
    setIsToggled(isInitiallyEnrolled);
  }, [isInitiallyEnrolled]);

  const handleToggle = () => {
    if (isToggled) {
      console.log("Course unenrolled");
      dispatch(
        deleteEnrollement({
          user: userId,
          course: courseId,
        })
      );
    } else {
      console.log("Course enrolled");
      dispatch(
        addEnrollement({
          user: userId,
          course: courseId,
        })
      );
    }
    setIsToggled(!isToggled);
  };

  return (
    <Button variant={isToggled ? "danger" : "success"} onClick={handleToggle}>
      {isToggled ? "Unenroll" : "Enroll"}
    </Button>
  );
};

export default ToggleButton;
