document.addEventListener('DOMContentLoaded', function () {
  const toggleTheme = document.getElementById('toggleTheme');
  const body = document.body;
  const todoOutput = document.getElementById('todoOutput');
  const todoList = document.getElementById('todo-list');
  const todoCount = document.getElementById('todo-count');
  const allTodos = document.getElementById('all-todos');
  const activeTodos = document.getElementById('active-todos');
  const completedTodos = document.getElementById('completed-todos');
  const todoOutputContainer = document.querySelector('.todo-output-container');
  const bgTop = document.getElementById('bg-top');

  console.log(todoOutputContainer);

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  const renderTodoList = () => {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.status === 'completed';
      li.appendChild(checkbox);

      const label = document.createElement('label');
      label.textContent = todo.text;
      li.appendChild(label);

      if (todo.status === 'completed') {
        label.classList.add('completed');
      }

      li.addEventListener('click', () => toggleTodoStatus(todo.id));
      todoList.appendChild(li);
    });

    updateTodoCount();
  };

  const updateTodoCount = () => {
    const activeTodosCount = todos.filter(
      (todo) => todo.status === 'pending'
    ).length;
    todoCount.innerText = activeTodosCount;
  };

  const updateOutputVisibility = () => {
    // todoOutput.style.display = todos.length > 0 ? 'block' : 'none';
    todoOutputContainer.style.display = todos.length > 0 ? 'block' : 'none';
  };

  const addTodo = () => {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
      const todoItem = {
        id: crypto.randomUUID(),
        text: todoText,
        status: 'pending',
      };
      todos.push(todoItem);
      saveTodos();
      renderTodoList();
      updateOutputVisibility();
      todoInput.value = '';
    }
  };

  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const toggleTodoStatus = (id) => {
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.status = todo.status === 'pending' ? 'completed' : 'pending';
      }
      return todo;
    });
    saveTodos();
    renderTodoList();
  };

  const showPendingTodos = () => {
    todos = todos.filter((todo) => todo.status === 'pending');
    renderTodoList();
    updateOutputVisibility();
  };

  const showCompletedTodos = () => {
    todos = todos.filter((todo) => todo.status === 'completed');
    renderTodoList();
    updateOutputVisibility();
  };

  const clearTodos = () => {
    todos = [];
    localStorage.removeItem('todos');
    renderTodoList();
    updateOutputVisibility();
  };

  toggleTheme.addEventListener('click', () => {
    //
    body.classList.toggle('light-theme');
    if (body.classList.contains('light-theme')) {
      bgTop.innerHTML = `<img src="images/bg-desktop-light.jpg" alt="bg-desktop-light" />`;
      toggleTheme.innerHTML = `<img src="images/icon-moon.svg" alt="theme-toggle" />`;
    } else {
      bgTop.innerHTML = `<img src="images/bg-desktop-dark.jpg" alt="bg-desktop-dark" />`;
      toggleTheme.innerHTML = `<img src="images/icon-sun.svg" alt="theme-toggle" />`;
    }
  });

  const todoInput = document.getElementById('todo-input');
  todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

  const clearTodosBtn = document.getElementById('clear-todos');
  clearTodosBtn.addEventListener('click', clearTodos);

  allTodos.addEventListener('click', renderTodoList);
  activeTodos.addEventListener('click', showPendingTodos);
  completedTodos.addEventListener('click', showCompletedTodos);

  renderTodoList();
  updateOutputVisibility();
});

// TODO: Drag and drop
