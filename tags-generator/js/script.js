
const tagsInput = document.querySelector(".tags-list__input");
const tagsList = document.querySelector(".tags-list");
const messageElement = document.querySelector(".message");
const maxCount = document.querySelector(".count");
const removeAllButton = document.querySelector(".remove-btn");
const copyButtton = document.querySelector(".copy-btn");

// Arrays to store tags
let tags = [] ;

// Maximum tag count
let maxTags = 10 ; 

// Function to create a new tag item
function createItem (){

    // Remove all existing tags
    document.querySelectorAll(".tags-list li").forEach(li => li.remove());
    
    // Reverse the tags array and create new tag elements
    [...tags].reverse().forEach( reverseTag => {
        const tagElement = document.createElement("li");
        tagElement.textContent = reverseTag;
    
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("uit" ,  "uit-multiply");
        tagElement.appendChild(deleteIcon);
    
        tagsList.insertAdjacentElement("afterbegin" , tagElement);

        // Event listener to remove a tag item when the delete icon is clicked
        deleteIcon.addEventListener("click", () => {
            removeTagItem(tagElement);
        });
    })

}

// Function to remove a tag item
function removeTagItem(tagElement){

    // Get the tag content to be removed
    const tagToRemove = tagElement.textContent;

    // Remove the tag from the tags array
    tags = tags.filter(tag => tag !== tagToRemove);
    
    // Remove the tag element from the DOM
    tagElement.remove();

    // Update the displayed maximum tags count 
    updateDisplayedTag();
    

    // Set focus back to the input element for a better user experience
    tagsInput.focus();
}


// Function to remove all tags 
function removeAllList() {

    tags = []; // Clear the tags array

    // Remove all tag items from the DOM
    const tagList = document.querySelectorAll(".tags-list li");
    tagList.forEach((tagItem) => {
        tagItem.remove();
    });

    // Reset and update the maximum tags count
    updateDisplayedTag();

    // Clear the input field and any displayed messages
    tagsInput.value = "";
    messageElement.textContent = "";
}

// Function to handle tag input when Enter key is pressed
function handleTagInput(event) {

    if (event.key === "Enter") {

        // Get the trimmed value of the input field
        const tagValue = tagsInput.value.trim();

        if (tagValue) {
            // Split the input value into words using a comma as the delimiter
            const words = tagValue.split(',');

            words.forEach(word => {
                if (word) {
                    // Check if the word is not already in the tags array and the tag limit is not exceeded
                    if (!tags.includes(word) && tags.length < 10) {
                        tags.push(word);

                        // Create and display the new tag element
                        createItem();

                        // Update the displayed maximum tags count
                        updateDisplayedTag();
                        

                    } else {
                        // Display an error message for duplicate tags or tag limit exceeded
                        messageElement.textContent = "You are allowed to enter up to 10 unique tags.";
                        // Clear the error message after 3 seconds
                        setTimeout(() => {
                            messageElement.textContent = "" ; 
                        }, 3000);
                        return;   
                    }
                }
            });
            
        } else {
            // Display an error message when the tag name is empty
            messageElement.textContent = "Tag name cannot be empty.";
            setTimeout(() => {
                messageElement.textContent = "" ; 
            }, 4000);
        }

        tagsInput.value = "";
    }
}

async function copyToClipboard(text){
    try {
        await window.navigator.clipboard.writeText(text);
    } catch (error) {
        throw error;
    }
}

function updateDisplayedTag () {
    // Update the displayed maximum tags count
    maxCount.textContent = maxTags - tags.length;
    if (maxTags - tags.length < 4){
        maxCount.style.color = "#EF5350"
    } else {
        maxCount.style.color = "initial"
    }
}


tagsInput.addEventListener("keydown" ,(event) => {
    handleTagInput(event);
    
})

// Event listener to remove all tags and reset tag-related elements
removeAllButton.addEventListener("click" , () => {
    removeAllList()

})

copyButtton.addEventListener("click" , () => {
    
    const allTagElemetns = document.querySelectorAll(".tags-list li"); // return a NodeList

    // Array.from() convert the NodeList to an array 
    const alltags = Array.from(allTagElemetns).map(tagElement => {

        const tagName = tagElement.textContent.trim();

        if (tagName) {

            // Add "#" at the beginning for each tag and replace spaces with underscores
            return "#" + tagName.replace(/\s+/g, "_");
        }
    });

    // Create a single string with formatted tags
    const tagsString = alltags.join(", ")

    // Use the Clipboard API to copy the string to the clipboard
    copyToClipboard(tagsString)
        .then(()=>{
            alert("Tags copied to clipboard");
        })
        .catch(error => {
            console.error("Clipboard copy failed: ", error);
        });
})
 // css , html, java script , js, react, bootstrap , design , frontend, webdev,devcommunity,learning, node js, 
 
