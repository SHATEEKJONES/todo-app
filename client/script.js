// Get DOM HTML Elements
const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");

// Fetch all todos when page loads
async function fetchTodos() {
  fetch("/api/todos")
    .then((response) => response.json())
    .then((data) => {
        displayTodos(data);
    });
}

// Display todos in the list
function displayTodos(todos) {
  let todotext = '';
  todos.forEach(todos => {
    console.log(todos)
    todotext += `
    <div>
       <input type="hidden" name="todoName" value="${todos.title}">
        <p>${todos.title}</p>
        <button onclick="removeTodo()" id="removebutton">Remove</button> 
    </div>
        `;
  });
  
        todoList.innerHTML = todotext;
}


const removeButton = document.getElementById("removeButton");

// Handle form submission
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(todoInput.value);
  try {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: todoInput.value }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Network response error.");
    }

    const newTodo = await response.json();
    console.log("New todo: " + newTodo);

    fetchTodos();
  } catch (error) {
    console.log("Error adding todo: " + error);
  }
});



async function removeTodo(todoId) { 
  event.preventDefault(); 
  try {  
    const response = await fetch(`/api/todos/${todoId}`, {  
      method: "DELETE",  
    });  
  
    if (!response.ok) {  
      throw new Error("Network response error.");  
    }  
  
    console.log("Todo removed: " + todoId);  
    fetchTodos(); // Refresh the list of todos  
  } catch (error) {  
    console.log("Error removing todo: " + error);  
  }  
}  

// Load todos when page loads
fetchTodos();
