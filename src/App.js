import "./App.css";
import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import Footer from "./components/Footer";

function App() {
	const [todos, setTodos] = useState(() => {
		console.log(JSON.parse(localStorage.getItem('todos')));

		const todos = JSON.parse(localStorage.getItem('todos'));
		console.log(JSON.parse(localStorage.getItem('todos')));
		return todos || [];
	});
	const [isCompletedAll, setIsCompletedAll] = useState(true);
	const [editID, setEditID] = useState(null);
	const [show, setShow] = useState('');

	useEffect( () => {
		let isCompletedAll = true;

		for(let i = 0 ; i < todos.length; i++) 
			if(todos[i].completed !==  true)
				isCompletedAll = false;
		
		setIsCompletedAll(isCompletedAll);
	}, [todos]);

	useEffect( () => {
		localStorage.setItem('todos', JSON.stringify(todos));
		console.log('save local');
	}, [todos])

	const addTodo = (value) => {
		const newTodos = [
			...todos,
			{
				id: uuidv4(),
				title: value,
				completed: false,
			}
		];

		setTodos(newTodos);
	}

	const handleToggleCompleted = (id) => {
		const newTodos = todos.map((todo, index) => {
			if(todo.id === id) {
				const newTodo = {...todo};
				newTodo.completed = !newTodo.completed;
				return newTodo;
			}
			return todo;
		})

		setTodos(newTodos);
	}

	const handleChangeTitle = (id, newTitle) => {
		const newTodos = todos.map((todo, index) => {
			if(todo.id === id) {
				const newTodo = {...todo};
				newTodo.title = newTitle;
				return newTodo;
			}
			return todo;
		});

		setTodos(newTodos);
	}

	const handleDeleteTodo = (id) => {
		const newTodos = todos.filter( todo => todo.id !== id );

		setTodos(newTodos);
	}

	const toggleCompletedAll = () => {
		const completed = !isCompletedAll;

		const newTodos = todos.map( todo => ({
			...todo,
			completed,
		}));

		setTodos(newTodos);
	}

	const editTodo = (id) => {
		setEditID(id);
	}

	const todosShow = (show) => {
		const todosShow = todos.filter( todo => {
			switch(show) {
				case 'active':
					return !todo.completed;
				case 'completed':
					return todo.completed;
				default:
					return true;
			}
		});

		return todosShow;
	}

	const changeTodosShow = show => {
		setShow(show);
	}

	const activeCount = () => {
		todos.reduce( (count, todo) => {
			if(!todo.completed)
				return count + 1;
			return count;
		}, 0)
	}

	const footer = todos.length ? 
			<Footer
				activeCount={activeCount()}
				changeTodosShow={changeTodosShow}
				show={show}
			/> 
			: null ;

  	return (
		<div className="app">
			<AddTodo 
				addTodo={addTodo} 
				toggleCompletedAll={toggleCompletedAll}
				isCompletedAll={isCompletedAll}
			/>
			{
				todosShow(show).map( todo => (
					<Todo 
						todo={todo} 
						onToggleComplete={handleToggleCompleted} 
						onDeleteClick={handleDeleteTodo} 
						key={todo.id}
						onChangeTitle={handleChangeTitle}
						editTodo={editTodo}
						disabled={ editID !== todo.id }
					/>
				)) 
			}
			{footer}			
		</div>
  	);
}

export default App;
