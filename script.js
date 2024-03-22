// document.addEventListener('DOMContentLoaded', function() {
    // const toggleTheme = document.getElementById('toggleTheme');
    // const body = document.body;
    // const todoOutput = document.getElementById('todoOutput')
    

    // toggleTheme.addEventListener('click', function() {
    //     console.log('This toggle theme is working')
    //     body.classList.toggle('Light-Theme');
    // });


//     // TODO: NEW ITEM
//     let todoInput = document.getElementById('todo-input')
//     todoInput.addEventListener("keypress", function(event){
//         if(event.key === "Enter") {
//             addTodo()
//         }
//     })

//     const addTodo = () => {
//     let todoText = todoInput.value.trim()
//     if(todoText !== ""){     
//         let todoList = document.getElementById('todo-list')
//         let li = document.createElement("li");
//         let checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.onclick = toggleTodo;
//         li.appendChild(checkbox);
//         let label = document.createElement("label");
//         label.textContent = todoText;
//         li.appendChild(label);
//         todoList.appendChild(li);
//         input.value = "";
//     }else {
//         alert("Please enter a todo");
//     }
//     }

//     const toggleTodo=() => {
//         let listItem = this.parentNode;
//         listItem.classList.toggle("completed");
//         let todoList = document.getElementById("todo-list");
//         console.log(todoList)
//         todoList.appendChild(listItem);
//     }


// });


document.addEventListener('DOMContentLoaded', function () {
    const toggleTheme = document.getElementById('toggleTheme');
    const body = document.body;
    const todoOutput = document.getElementById('todoOutput')
    const todoList = document.getElementById('todo-list')
    

    toggleTheme.addEventListener('click', function() {
        // console.log('This toggle theme is working')
        body.classList.toggle('Light-Theme');
    });

    let todos = []
    // console.log(todos.length)

    function updateOutputVisibility() {
        if (todos.length === 0) {
            todoOutput.style.display = 'none';
        } else {
            todoOutput.style.display = 'block';
        }
    }
    
    updateOutputVisibility();


    let todoInput = document.getElementById('todo-input')
    todoInput.addEventListener("keypress", function(event){
        if(event.key === "Enter") {
            addTodo()
        }
    })


    const addTodo = () => {
        let todoText = todoInput.value.trim()
        if(todoInput !== ''){
            let todoItem = {
                id: crypto.randomUUID(),
                text: todoText,
                status: 'pending'
            }
            todos.push(todoItem);
            console.log(todos);

            let li = document.createElement("li")
            renderTodoList()
            updateOutputVisibility();
            todoInput.value = '';
        }
    }
    
    const removeTodo = (id) => {
        todos = todos.map(todo => {
            if (todo.id === id) {
                todo.status = 'completed';
            }
            return todo;
        });
        renderTodoList()
        updateOutputVisibility();
    }

    const renderTodoList = () => {
        todoList.innerHTML = ''; // Clear previous list
        todos.forEach(todo => {
        let li = document.createElement("li");
        // let checkbox = document.createElement("input")
        // checkbox.type = "checkbox"
        li.textContent = todo.text;
        if (todo.status === 'completed') {
            li.style.textDecoration = 'line-through';
        }
        li.addEventListener('click', () => removeTodo(todo.id)); 
        todoList.appendChild(li);
    });
    }

})