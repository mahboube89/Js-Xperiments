// Get the ul element where the todo items will be displayed
const ulElement = document.getElementsByClassName("list-group")[0];

// Get the input field and the message display elements
let input = document.getElementById("input-item");
let message = document.getElementById("message");


// Function to remove an item
function removeItem(event) {
  // Remove the parent list item of the clicked trash icon
  event.target.parentElement.remove(); // Remove clicked list item

  // Display a message to indicate successful removal
  message.innerText = "Todo removed successfully :)";
  
  // Change the color of the message to red
  message.style.color = "red"; 

  // Clear the message after 2 seconds
  setTimeout(function () {  
    message.innerText = "";
  }, 2000);
}

// Function to add a new todo item
function addItem() {
  // Get and trim the value entered in the input field
  let inputValue = input.value.trim(); 

  // Clear any previous message
  message.innerText = ""; 

  // Validate input value
  // Check if the input is empty and, if so, display an error message
  if (inputValue === "") {
    message.innerText = "Empty Field"; 
    message.style.color = "red";
    return; // Exit the function if the input is empty
  }


  // Create a new list item (li) element
  const li = document.createElement("li");

  // Add classes to style the new list item
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  // Insert the input value within the list item
  li.innerHTML = "<span>" + inputValue + "</span>";

  // Create a new trash icon element
  const trashItem = document.createElement("i");
  trashItem.className = "fa fa-trash delete";

  // Append trash icon to the list item
  li.appendChild(trashItem);

  // Append the list item to the ul element
  ulElement.appendChild(li);

  // Display success message and clear input field
  message.innerText = "New Todo added successfully :)";
  message.style.color = "green";

  // Clear the input field
  input.value = "";

  // Clear the message after 2 seconds
  setTimeout(function () {
    message.innerText = "";
  }, 2000);

  // Add event listener to the trash icon for removing the item
  trashItem.addEventListener("click", removeItem);
}

// Add an event listener for the 'keydown' event on the input field
input.addEventListener("keydown", function (event) {
  // Check if the 'Enter' key was pressed
  if (event.key === "Enter") {
    // Prevent the default action (form submission, etc.)
    event.preventDefault(); 

    // Call the addItem function to add a new todo item
    addItem(); 
  }
});
