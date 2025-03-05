// Get DOM HTML Elements
const todoList = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');


  
// Fetch all todos when page loads
async function fetchTodos() {
    fetch("/api/todos")
  .then((response) => response.json())
  .then((data) => {
    data.forEach(todos => {
      displayTodos(todos)
    });
  });
    }
    
    // Display todos in the list
    function displayTodos(todos) {
        todoList.innerHTML +=
        `
       <input type="hidden" name="todoName" value="${todos.title}">
        <p>${todos.title}</p>
        `
        console.log(todos.title)
    }
    
    // Handle form submission
    todoForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      
      try{
        const response = await fetch('api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'applications/json'
          },
          body: JSON.stringify({title: todoInput.value})
      });
      

      if(!response.ok){
        throw new Error('Network response error.')
      }

      const newTodo = await response.json();
      console.log('New todo: ' + newTodo);

      await fetchTodos();
    }catch(error){
        console.log("Error adding todo: " + error)
      }
    });
    
    // Load todos when page loads
    fetchTodos();
    

