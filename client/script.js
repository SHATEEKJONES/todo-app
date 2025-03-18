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
  todos.forEach(todo => {
    console.log(todo)
    todotext += `
    <div>
       <input type="hidden" name="todoName" value="${todo.title}">
        <p>${todo.title}</p>
        <button onclick="removeTodo('${todo._id}')" id="removebutton">Remove</button>
        <button onclick="updateTodo('${todo._id}')" id="updButton">Update</button>  
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


//REMOVE FUNCTION BLIKCY
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

async function updateTodo(todoId) { 
  event.preventDefault(); 

  const updateData = { title: todoInput.value };

  const jsonData = JSON.stringify(updateData);
  
  console.log(jsonData)
  
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    };

    fetch(`/api/todos/${todoId}`, options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    console.log('Resource updated successfully:', data);
    fetchTodos();
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });

}  

// Load todos when page loads
fetchTodos();
