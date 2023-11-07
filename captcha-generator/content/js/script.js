
const captchaTxt = document.querySelector(".container__captcha-text");
const userInput = document.querySelector(".captcha__input");
const refreshBtn = document.querySelector(".container__captcha-refresh");
const resultMessage = document.querySelector("#resultMessage");

let captchaCode = generateCaptcha();

// Function to generate a random CAPTCHA string
function generateCaptcha(length = 5) {
    
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');     
    }

// Function to draw the CAPTCHA string on the Canvas
function drawOnCanvas() {

    // Get the 2D rendering context for the Canvas
    const ctx = captchaTxt.getContext("2d");
    ctx.clearRect(0, 0, captchaTxt.width, captchaTxt.height); // Clear the Canvas
    ctx.font = "34px Roboto Mono";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Draw each letter with its own styling and position
  captchaCode.split('').forEach((letter, index) => {
    ctx.font = getFontStyle(index); // Get the font style for each letter
    ctx.fillStyle = getRandomColor(); // Set a random color for each letter
    const xPos = getXPosition(index, ctx, letter); // Calculate the x position for each letter
    ctx.fillText(letter, xPos, captchaTxt.height / 2);
  });
}
   
// Generate a random color
function getRandomColor() {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`;
}

// Function to get font style depending on the letter index
function getFontStyle(index) {
    return index % 2 === 0 ? "italic 50px VT323, monospace" : "60px VT323";
}

// Function to calculate the x position for each letter
function getXPosition(index, ctx, letter) {
    const letterSpacing = 24;
    let offset = (captchaCode.length - 1) * letterSpacing ;
    return captchaTxt.width / 2 - offset + index * (ctx.measureText(letter).width + letterSpacing); 
}

// Function to refresh the CAPTCHA
function refreshCaptcha() {

    // Clear the user's previous input
    userInput.value = "";

    // Clear the result message
    resultMessage.textContent = "";

    // Reset border color
    userInput.style.borderColor = "";

    captchaCode = generateCaptcha();

    drawOnCanvas();
}


// Function to validate the user's input against the CAPTCHA
document.querySelector(".submit__btn").addEventListener("click", function(event){
    
    // Prevent the default button click behavior
    event.preventDefault();
   
    if(userInput.value.toLowerCase() === captchaCode.toLocaleLowerCase()) {
        
        // Show a success message and update the UI
        resultMessage.textContent = "CAPTCHA verification successful!";
        resultMessage.style.color = "darkgreen";  // Set color to green for success message
        userInput.style.borderColor = "";  // Reset border color
        
    // Check if the input is empty
    } else if (!userInput.value.trim()) {

       resultMessage.textContent = 'Please enter the CAPTCHA code.';
       resultMessage.style.color = "darkred";

    } else {
        // Show an error message and update the UI
        resultMessage.textContent = "Invalid CAPTCHA. Please try again.";
        resultMessage.style.color = "darkred";  // Set color to red for error message
        userInput.value = ""; // Clear the user input field
        captchaCode = generateCaptcha();
        drawOnCanvas();   
    }
    userInput.value = "";
});


window.addEventListener("load", function() {
    refreshCaptcha();// Refresh the CAPTCHA when the page loads
});

// This event is triggered when the 'Refresh' button is clicked
refreshBtn.addEventListener("click", refreshCaptcha);


userInput.addEventListener("keypress" , (event) => {
    
    if (event.key === "Enter"){
        validateCaptcha();
        userInput.value = ""
    }
})