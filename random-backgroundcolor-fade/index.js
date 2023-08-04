setInterval(function(){
//This function changes the background color of the body

// Generate a random RGB color and set the body's background color to the generated random color.
document.body.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
},3000)
  