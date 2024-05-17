// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get references to the DOM elements
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

  // Load todos from local storage or initialize to an empty array
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  // Function to render the todo list
  const renderTodoList = (todosToRender = todos) => {
    todoList.innerHTML = '';
    todosToRender.forEach((todo) => {
      // Create the list item
      const li = document.createElement('li');
      li.setAttribute('draggable', true);

      // Create the checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.status === 'completed';
      li.appendChild(checkbox);

      // Create the label
      const label = document.createElement('label');
      label.textContent = todo.text;
      li.appendChild(label);

      // Add the 'completed' class if the todo is completed
      if (todo.status === 'completed') {
        label.classList.add('completed');
      }

      // Add event listener to toggle the todo status when the list item is clicked
      li.addEventListener('click', () => toggleTodoStatus(todo.id));

      // Add the list item to the todo list
      todoList.appendChild(li);
    });

    // Update the todo count
    updateTodoCount();
  };

  // Function to update the todo count
  const updateTodoCount = () => {
    const activeTodosCount = todos.filter(
      (todo) => todo.status === 'pending'
    ).length;
    todoCount.innerText = activeTodosCount;
  };

  // Function to update the visibility of the todo output
  const updateOutputVisibility = () => {
    todoOutputContainer.style.display = todos.length > 0 ? 'block' : 'none';
  };

  // Function to add a new todo
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
      renderTodoList(todos); // This will render the original todos array
      updateOutputVisibility(); // Show the todo output container
      todoInput.value = '';
    }
  };

  // Function to save todos to local storage
  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  // Function to toggle the status of a todo
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

  // Function to show only pending todos
  const showPendingTodos = () => {
    const pendingTodos = todos.filter((todo) => todo.status === 'pending');
    renderTodoList(pendingTodos);
  };

  // Function to show only completed todos
  const showCompletedTodos = () => {
    const completedTodos = todos.filter((todo) => todo.status === 'completed');
    if (completedTodos.length === 0) {
      todoList.innerHTML = `<div class="no-todo">Oops! you have not completed any todo.</div>`;
    } else {
      renderTodoList(completedTodos);
    }
  };

  // Function to clear completed todos
  const clearCompletedTodos = () => {
    todos = todos.filter((todo) => todo.status !== 'completed');
    saveTodos();
    renderTodoList();
    updateOutputVisibility();
  };

  // Function to show all todos
  const showAllTodos = () => {
    renderTodoList(todos);
  };

  // Add event listener to toggle the theme when the toggle button is clicked
  toggleTheme.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    if (body.classList.contains('light-theme')) {
      bgTop.innerHTML = `<img src="images/bg-desktop-light.jpg" alt="bg-desktop-light" />`;
      toggleTheme.innerHTML = `<img src="images/icon-moon.svg" alt="theme-toggle" />`;
    } else {
      bgTop.innerHTML = `<img src="images/bg-desktop-dark.jpg" alt="bg-desktop-dark" />`;
      toggleTheme.innerHTML = `<img src="images/icon-sun.svg" alt="theme-toggle" />`;
    }
  });

  // Add event listener to add a new todo when the enter key is pressed
  const todoInput = document.getElementById('todo-input');
  todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  });

  // Add event listener to clear completed todos when the clear button is clicked
  const clearTodosBtn = document.getElementById('clear-todos');
  clearTodosBtn.addEventListener('click', clearCompletedTodos);

  // Add event listeners to show all, active, or completed todos when the corresponding button is clicked
  allTodos.addEventListener('click', showAllTodos);
  activeTodos.addEventListener('click', showPendingTodos);
  completedTodos.addEventListener('click', showCompletedTodos);

  // Render the todo list and update the output visibility
  renderTodoList();
  updateOutputVisibility();

  // Drag and drop functionality
  let draggedItem = null;

  todoList.addEventListener('dragstart', (event) => {
    draggedItem = event.target;
    setTimeout(() => {
      draggedItem.style.display = 'none';
    }, 0);
  });

  todoList.addEventListener('dragend', (event) => {
    setTimeout(() => {
      event.target.style.display = '';
      draggedItem = null;
    }, 0);
  });

  todoList.addEventListener('dragover', (event) => {
    event.preventDefault();
    const afterElement = getDragAfterElement(todoList, event.clientY);
    const currentElement = document.querySelector('.dragging');

    if (afterElement == null) {
      todoList.appendChild(draggedItem);
    } else {
      todoList.insertBefore(draggedItem, afterElement);
    }
  });

  const getDragAfterElement = (container, y) => {
    const draggableElements = [
      ...container.querySelectorAll('li:not(.dragging)'),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  };
});
