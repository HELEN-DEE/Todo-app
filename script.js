document.addEventListener('DOMContentLoaded', function() {
    const toggleTheme = document.getElementById('toggleTheme');
    const body = document.body;
    

    toggleTheme.addEventListener('click', function() {
        console.log('This toggle theme is working')
        body.classList.toggle('Light-Theme');
    });


    // TODO: NEW ITEM
    let todoInput = document.getElementById('todo-input')
    todoInput.addEventListener("keypress", function(event){
        if(event.key === "Enter") {
            addTodo()
        }
    })

    const addTodo = () => {
    let todoText = todoInput.value.trim()
    if(todoText !== ""){
        let todoList = document.getElementById('todo-list')
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onclick = toggleTodo;
        li.appendChild(checkbox);
        let label = document.createElement("label");
        label.textContent = todoText;
        li.appendChild(label);
        todoList.appendChild(li);
        input.value = "";
    }else {
        alert("Please enter a todo");
    }
    }

    const toggleTodo=() => {
        let listItem = this.parentNode;
        listItem.classList.toggle("completed");
        let todoList = document.getElementById("todo-list");
        todoList.appendChild(listItem);
    }


});
