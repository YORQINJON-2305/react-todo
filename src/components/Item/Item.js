import { Button } from "../Button/Button";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { Modal } from "../Modal/Modal";

export const Item = ({ id, text, isCompleted, todos, setTodos }) => {
	const [editTaskModal, setEditTaskModal] = useState(false);
	const [editTask, setEditTask] = useState("");
	const [editTextId, setEditTextId] = useState("");
	const editRef = useRef();

	const handleDeleteTodo = (todoId) => {
		const filteredTodos = todos.filter((item) => item.id !== todoId);
		setTodos(filteredTodos);

		toast.error("Delete todo!!!");
	};

	const handlePostSubmit = (evt) => {
		evt.preventDefault();
		const findedTodo = todos.find((item) => item.id === editTextId);
		findedTodo.text = editRef.current.value;
		setTodos([...todos]);
		setEditTaskModal(false);

		toast.info("Edit todo!");
	};

	const handleCompleteTodo = (todoId) => {
		const findedTodo = todos.find((item) => item.id === todoId);
		findedTodo.isCompleted = !findedTodo.isCompleted;
		setTodos([...todos]);

		if (!isCompleted) {
			toast.info("Completed todo!");
		} else {
			toast.warning("Uncompleted todo!");
		}
	};

	return (
		<>
			<li
				className={
					isCompleted
						? "d-flex align-items-center mt-3 opacity-25"
						: "d-flex align-items-center mt-3"
				}
			>
				<strong className='me-2'>ID: {id}</strong>
				<input
					className='form-check-input me-2 mt-0'
					onChange={() => handleCompleteTodo(id)}
					defaultChecked={isCompleted}
					type='checkbox'
				/>
				<strong
					className={
						isCompleted
							? "flex-grow-1 text-decoration-line-through"
							: "flex-grow-1"
					}
				>
					{text}
				</strong>
				<Button
					onClick={() => {
						setEditTaskModal(true);
						setEditTask(text);
						setEditTextId(id);
					}}
					className='btn btn-warning me-2'
				>
					Edit
				</Button>
				<Button onClick={() => handleDeleteTodo(id)} className='btn btn-danger'>
					Delete
				</Button>
			</li>

			{editTaskModal ? (
				<Modal title='Edit task' setModal={setEditTaskModal}>
					<form onSubmit={handlePostSubmit}>
						<input
							className='form-control'
							type='text'
							ref={editRef}
							defaultValue={editTask}
						/>
						<button className='btn btn-warning mt-3'>Edit</button>
					</form>
				</Modal>
			) : null}
		</>
	);
};
