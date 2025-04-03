import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
export default function TodoItem({
  todo
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();
  return (
    <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
      <span>{todo.title}</span>
      <div>
        <Button
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
          variant="primary"
          className="me-2"
        >
          Edit
        </Button>
        <Button
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
          variant="danger"
        >
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
}
