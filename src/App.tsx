import React, { useState } from 'react';

type Todo = {
  id: number;
  task: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  }

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    // check if the value is empty
    if (task.trim().length === 0) {
      alert("값을 넣어주세요!");
      return;
    }

    // create a new todo
    const todo: Todo = {
      id: Date.now(),
      task: task,
    };

    // add todo to the state
    setTodos([todo, ...todos]);

    // clear the value of task
    setTask("");
  }
  
  const deleteTodo = (id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    todos.splice(index, 1);
    setTodos([...todos]);
  }

  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <input type="text" name="task" placeholder="할 일을 추가하세요" value={task} onChange={handleChange}/>
        <button type="submit">Add</button>
      </form>
      <ul className="todoList">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
