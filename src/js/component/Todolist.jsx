import React, { useState, useEffect } from "react";
import shortid from "shortid";
const Todolist = () => {
	let [tarea, setTarea] = useState({
		label: "",
		done: false
	});
	let [listaTareas, setListaTareas] = useState([]);
	let restantes;
	if (listaTareas.length === 0) {
		restantes = "Add a todo";
	} else {
		restantes = `We are missing ${listaTareas.length} tasks`;
	}
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/oscars97", {
			method: "PUT",
			body: JSON.stringify(listaTareas),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	});
	const obtenerValor = e => {
		if (e.key.toLowerCase() === "enter") {
			let valor = e.target.value;
			console.log(valor);
			setTarea(
				(tarea = {
					label: valor,
					done: false,
					id: shortid.generate()
				})
			);
			setListaTareas([...listaTareas, tarea]);
		}
		setTarea("");
	};
	function handleRemove(id) {
		const newList = listaTareas.filter(item => item.id !== id);
		setListaTareas(newList);
	}
	return (
		<div className="container">
			<h1>Todos</h1>
			<div className="input-group input-group-lg">
				<input
					placeholder="Agrega una tarea"
					onKeyPress={obtenerValor}
					type="text"
					className="form-control"
					aria-label="Sizing example input"
					aria-describedby="inputGroup-sizing-lg"
				/>
			</div>

			<ul className="list-group d-flex">
				{listaTareas.map((item, i) => (
					<li className="list-group-item" key={item.id}>
						<div className="task">
							<div className>
								<span className="lead">{item.label}</span>
							</div>
							<div>
								<button
									className="btn btn-danger"
									type="button"
									onClick={() => handleRemove(item.id)}>
									<i className="far fa-trash-alt"></i>
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
			<strong>{restantes}</strong>
		</div>
	);
};

export default Todolist;
