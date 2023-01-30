import "./assets/styles/main.css";
import { Item } from "./components/Item";
import { List } from "./components/List";
import { useRef, useState } from "react";
import { Button } from "./components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "@mui/material";

function App() {
	const inputValue = useRef();
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem("todos")) || []
	);

	function handleSubmit(evt) {
		evt.preventDefault();
		const newObj = {
			id: todos.length ? todos.at(-1).id + 1 : 1,
			text: inputValue.current.value,
			isCompleted: false,
		};

		setTodos([...todos, newObj]);
		inputValue.current.value = "";

		toast.success("Add todo");
	}

	localStorage.setItem("todos", JSON.stringify(todos));

	return (
		<>
			<div className='container'>
				<h1 className='text-center display-3 mb-0'>Todo</h1>
				<div className='row'>
					<div className='col-6 offset-3 p-5 shadow'>
						<form onSubmit={handleSubmit}>
							<div className='input-group'>
								<TextField
									className='form-control'
									label='Todo...'
									variant='outlined'
									type='text'
									ref={inputValue}
								/>
								<Button className='btn btn-primary' type='submit'>
									Send
								</Button>
							</div>
						</form>
						{todos.length ? (
							<List>
								{todos.map((item) => (
									<Item
										key={item.id}
										todos={todos}
										setTodos={setTodos}
										{...item}
									/>
								))}
							</List>
						) : (
							<p className='text-center pt-3 mb-0'>Todolar mavjud emas!</p>
						)}
					</div>
				</div>
			</div>

			<ToastContainer
				position='top-right'
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
		</>
	);
}

export default App;
