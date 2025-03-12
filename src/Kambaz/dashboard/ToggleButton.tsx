import  { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addEnrollement, deleteEnrollement } from './enrollementReducer';

const ToggleButton = ({enrollementId, userId, courseId}: { enrollementId: number, userId: number, courseId: number }) => {
  // Track the toggle state
  const [isToggled, setIsToggled] = useState(false);
  const dispatch = useDispatch();
  const { enrollementReducer } = useSelector((state: any) => state.enrollementReducer);
// The button's click handler function
  // Toggle handler function
  const handleToggle = () => {
    setIsToggled(!isToggled); 
    if(isToggled) {
        // Perform your enroll action here
        console.log('Course enrolled');
        dispatch(addEnrollement({
            user: userId,
            courses: courseId,
        }));

    } else {
        // Perform your unenroll action here
        console.log('Course unenrolled');
        dispatch(deleteEnrollement(enrollementId));
  
  };
  }
  
  return (
    <Button
      variant={isToggled ? 'danger' : 'success'} // Change the color based on state
      onClick={handleToggle} // Toggle the state on click
    >
      {isToggled ? 'Unenroll' : 'Enroll'} {/* Change the text based on state */}
    </Button>
  );
};

export default ToggleButton;
