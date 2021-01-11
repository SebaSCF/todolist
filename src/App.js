import react, {useState, useEffect} from 'react';
import './App.css';
import Form from './Components/Form';
import Todolist from './Components/Todolist';

function App() {


  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);


  useEffect(() => {
    getLocalTodos();
  }, [todos, status])


  useEffect(() => {
    filterHandler();
    SaveToLocal();
  }, [todos, status])


  const filterHandler = () => {
    switch (status) {
      case "completed":
          setFilteredTodos(todos.filter(todo => todo.completed == true))
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed == false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  const SaveToLocal = () => {   localStorage.setItem("todos", JSON.stringify(todos)); }


  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      console.log(todoLocal);
    }
}

  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form
        status={status}
        setStatus={setStatus}
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
      />

      <Todolist
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos} />
    </div>
  );
}

export default App;
