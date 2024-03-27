document.addEventListener('DOMContentLoaded', function () {
  const toggleTheme = document.getElementById('toggleTheme');
  const body = document.body;
  const todoOutput = document.getElementById('todoOutput');
  const todoList = document.getElementById('todo-list');
  const todoCount = document.getElementById('todo-count');
  const allTodos = document.getElementById('all-todos');
  const activeTodos = document.getElementById('active-todos');
  const completedTodos = document.getElementById('completed-todos');

  console.log(allTodos);
  console.log(activeTodos);
  console.log(completedTodos);

  toggleTheme.addEventListener('click', function () {
    body.classList.toggle('Light-Theme');
  });

  let todos = [];

  function updateOutputVisibility() {
    if (todos.length === 0) {
      todoOutput.style.display = 'none';
    } else {
      todoOutput.style.display = 'block';
    }
  }

  updateOutputVisibility();

  let todoInput = document.getElementById('todo-input');
  todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

  const addTodo = () => {
    let todoText = todoInput.value.trim();
    if (todoText !== '') {
      let todoItem = {
        id: crypto.randomUUID(),
        text: todoText,
        status: 'pending',
      };
      todos.push(todoItem);
      renderTodoList();
      updateOutputVisibility();
      todoInput.value = '';
    }
  };

  const toggleTodoStatus = (id) => {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.status = todo.status === 'pending' ? 'completed' : 'pending';
      }
      return todo;
    });
    renderTodoList();
    updateOutputVisibility();
  };

  const showPendingTodos = () => {
    todos = todos.filter((todo) => todo.status === 'pending');
    renderTodoList();
    updateOutputVisibility();
  };

  // FIXME: Only show todos with the status of completed
  const clearTodos = () => {
    todos = [];
    renderTodoList();
    updateOutputVisibility();
  };

  const clearTodosBtn = document.getElementById('clear-todos');

  clearTodosBtn.addEventListener('click', showPendingTodos);

  const renderTodoList = () => {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
      let li = document.createElement('li');
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      li.appendChild(checkbox);
      let label = document.createElement('label');
      label.textContent = todo.text;
      li.appendChild(label);

      todoCount.innerText = todos.length;
      if (todo.status === 'pending') {
        todoCount.innerText = todos.filter(
          (todo) => todo.status === 'pending'
        ).length;
      }

      if (todo.status === 'completed') {
        checkbox.checked = true;
        li.style.textDecoration = 'line-through';
      }

      li.addEventListener('click', () => toggleTodoStatus(todo.id));
      todoList.appendChild(li);
    });
  };

  // allTodos.addEventListener('click', renderTodoList);
  // activeTodos.addEventListener('click', showPendingTodos);
  // const showCompletedTodos = () => {
  //   todos = todos.filter((todo) => todo.status === 'completed');
  //   renderTodoList();
  //   updateOutputVisibility();
  // };

  // completedTodos.addEventListener('click', showCompletedTodos);
});
