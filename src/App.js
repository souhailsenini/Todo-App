import { useState } from "react";

const initialTodos = [
  
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = (newTodo) => setTodos((prevTodos) => [...prevTodos, newTodo]);

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    
  };

  const handleToggleCheck = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  return (
    <div className="app">
      <Header />
      <TodoInput onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onDeleteTodo={handleDeleteTodo}
        onToggleCheck={handleToggleCheck}
      />
    </div>
  );
}

const Header = () => (
  <header>
    <img src="https://cdn-icons-png.flaticon.com/512/5234/5234602.png" alt="ok logo" />
    <h1>Todo app</h1>
  </header>
);

const TodoInput = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleTodoSubmit = (e) => {
    e.preventDefault();

    if (!newTodo) return;

    const id = crypto.randomUUID();
    const todo = { id, todo: newTodo, checked: false };

    onAddTodo(todo);
    setNewTodo('');
  };

  return (
    <form className="todo-form" onSubmit={handleTodoSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Write your Todo ..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className="btn" type="submit">
        <img className="do" src="https://cdn-icons-png.flaticon.com/512/5234/5234602.png" alt="ok logo" />
      </button>
    </form>
  );
};

const TodoList = ({ todos, onDeleteTodo, onToggleCheck }) => (
  <div className="todo-list">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onDelete={() => onDeleteTodo(todo.id)}
        onToggleCheck={() => onToggleCheck(todo.id)}
      />
    ))}
  </div>
);

const TodoItem = ({ todo, onDelete, onToggleCheck }) => (
  <div className={`todo-item ${todo.checked ? 'checked' : ''}`}>
    <input
      className="checkbox"
      type="checkbox"
      checked={todo.checked}
      onChange={onToggleCheck}
    />
    <p>{todo.todo}</p>
    <button className="delete-btn" onClick={onDelete}>
      🗑️
    </button>
  </div>
);

export default App;
