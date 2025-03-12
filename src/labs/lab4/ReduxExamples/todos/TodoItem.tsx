import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";function TodoItem({ todo } : { todo: { id: string, title: string } }) {
  const dispatch = useDispatch();  
  return (
      <li key={todo.id} className="list-group-item">
        {/* Buttons with clear descriptions of their actions */}
        <button onClick={() => dispatch(deleteTodo(todo.id))}> 
          Delete this todo 
        </button>
        <button onClick={() => dispatch(setTodo(todo))}> 
          Edit this todo 
        </button>
  
        {todo.title}  {/* Renders the todo title  */}
      </li>
    );
  }
  export default TodoItem;