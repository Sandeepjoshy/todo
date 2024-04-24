import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Search from "./components/TodoSearch";
import TodoList from "./components/TodoList";
import Filter from "./components/TodoFilter";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState("")

useEffect(() => {
  axios("http://127.0.0.1:8000/todos")
  .then(res => setTodos(res.data))
  .catch(res => setErrors(err.message))
}, [])

// add todo function
  const addTodo = (data) => {
    const originalTodos = [...todos]
    setTodos( [ ...todos, data={...data, id:parseInt(todos[todos.length-1].id) + 1, status:"Active"}] )
    axios.post("http://127.0.0.1:8000/todos" , data)
    .then(res => setTodos([...todos, res.data]))
    .catch(err =>{
      setErrors(err.message)
      setTodos(originalTodos)
    })
  }

  // delete function
  const delTodo = (id) => {
    setTodos(todos.filter( todo => todo.id != id ))
    axios.delete("http://127.0.0.1:8000/todos/" + id)
    .catch(err => setErrors(err.message))
  }


  // update function
  const updateTodo = (e, id, text) => {
    e.preventDefault()
    // this line helps to get the current todo based on the ID called todoId in TodoList
    const todo = todos[id]
    const updatedUser = { ...todo, task:text, status:"Active" }
    setTodos(todos.map(t => t.id == todo.id ? updatedUser : t))
    axios.patch("http://127.0.0.1:8000/todos" + id)

  }

  const completeTodo = (e, id) => {

    if(e.target.checked){
      console.log("okay")
      setTodos(todos.map(todo => todo.id == id ? { ...todo, completed:"true"}: todo))
      axios.patch("http://127.0.0.1:8000/todos" + id, updateTodo)
    }
    else
    {
      console.log("omo")
      setTodos(todos.map(todo => todo.id == id ? { ...todo, status:"Active"}: todo))
    }

   
  }

  const filterTodo = (cat_value) => {
    // setTodos(todos.filter(todo => todo.status == cat_value))
    setTodos(todos.filter((todo) => todo.status == cat_value))
  }


  return (
    <div className="todo-container">
      {errors && <p>{errors}</p>}
      <Search addTodo = { addTodo } />
      <Filter filter_todo = { filterTodo }/>
      <TodoList todos = { todos } delTodo = { delTodo } update_todo = { updateTodo } complete_todo = { completeTodo } filter_todo = { filterTodo } />
    </div>
  );
}



export default App;
