// Initial setup for CAPTCHA
let captchaCode = generateCaptcha();
const userInput = document.getElementById("captchaInput");
const captchaTxt = document.getElementById ("captchaText");
const resultMessage = document.getElementById("resultMessage");


// Function to generate a random CAPTCHA string
function generateCaptcha() {
    // Characters that can be used in the CAPTCHA
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const captchaLength = 5;
    let captchaCode = "";

    // For each character in the CAPTCHA
    for (let i = 0; i < captchaLength; i++) {
        // Generate a random index into the characters string
        const randomIndex = Math.floor(Math.random() * characters.length);
        // Add the character at the random index to the CAPTCHA
        captchaCode += characters.charAt(randomIndex);
    }
    return captchaCode;    
}


// Function to draw the CAPTCHA string on the Canvas
function drawOnCanvas() {
    // Get the 2D rendering context for the Canvas
    const ctx = captchaTxt.getContext("2d");
    // Clear the Canvas
    ctx.clearRect(0, 0, captchaTxt.width, captchaTxt.height);

    // Set the default font properties
    ctx.font = "30px Roboto Mono";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    
    // Determine the spacing between letters
    const letterSpacing = 30; // Adjust this value to increase/decrease spacing
    let xPos = captchaTxt.width / 2 - ((captchaCode.length - 1) * letterSpacing + ctx.measureText(captchaCode).width) / 2;
    
    // For each letter in the CAPTCHA
    for (let i = 0; i < captchaCode.length; i++) {
        // Get the current letter
        const letter = captchaCode[i];
        // Generate a random color
        const randomColor = getRandomColor();
        // Set the fill color
        ctx.fillStyle = randomColor;

        // Italicize every second letter
        if (i % 2 === 0) {
            // Italicize every second letter
            ctx.font = "italic 40px VT323, monospace ";
        } else {
            ctx.font = "50px VT323";
        }
        
        // Draw the letter
        ctx.fillText(letter, xPos, captchaTxt.height / 2);
        // Update the position for the next letter
        xPos += ctx.measureText(letter).width + letterSpacing;
    }


    // Function to generate a random color
    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}


// Function to refresh the CAPTCHA
function refreshCaptcha() {
    // Clear the user's previous input
    userInput.value = "";
    // Clear the result message
    resultMessage.textContent = "";
    // Reset border color
    userInput.style.borderColor = ""; 
    // Generate a new CAPTCHA
    captchaCode = generateCaptcha();
    // Draw the new CAPTCHA on the Canvas
    drawOnCanvas();
    
}


// Function to validate the user's input against the CAPTCHA
function validateCaptcha() {
    // Get the user's input
    const userEnteredCode = userInput.value;
    const captchaText = captchaCode;
    // If the user's input matches the CAPTCHA
    if (userEnteredCode === captchaText) {
        
        // Show a success message and update the UI
        resultMessage.textContent = "CAPTCHA verification successful!";
        resultMessage.style.color = "darkgreen";  // Set color to green for success message
        userInput.style.borderColor = "";  // Reset border color
    } else {
        // Show an error message and update the UI
        resultMessage.textContent = "Invalid CAPTCHA. Please try again.";
        resultMessage.style.color = "darkred";  // Set color to red for error message
        userInput.style.borderColor = "darkred";  // Set border color to red for error
        userInput.value = ""; // Clear the user input field
        captchaCode = generateCaptcha();
        drawOnCanvas();
        
    }
    
}

// This event is triggered when the page loads
window.addEventListener("load", function() {
    refreshCaptcha();// Refresh the CAPTCHA when the page loads
});

// This event is triggered when the 'Refresh' button is clicked
document.getElementById("refresh").addEventListener("click", refreshCaptcha);

// This event is triggered when the 'Submit' button is clicked
document.getElementById("submit").addEventListener("click", validateCaptcha);