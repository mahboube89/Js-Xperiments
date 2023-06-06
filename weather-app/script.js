
//Refrence to HtML elements
const result = document.getElementById ("result");
const searchBtn = document.getElementById ("search-btn");
const cityRef = document.getElementById ("city");

//Function to fetch weather details from api and display them
const getWeather = ()=> {
    const cityValue=cityRef.value;


    if (cityValue.length == 0){
        //Display a mesage if the city name is not entered
        result.innerHTML =`<h3 class="msg">Please enter a city name to search</h3>`;
        return; //Early return if city name is empty
    }
    else{
        //https://openweathermap.org/current for more information
        //API URL for fetching weather data
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`
        //clear the input field
        cityRef.value= "";
        fetch(url)
            .then((resp)=> resp.json())
            .then((data) =>{
                console.log(data);

                //Display the weather data in the result div
                result.innerHTML=`
                    <h2>${data.name}</h2>
                    <h1>${data.main.temp}&#176;</h1>
                    <h4 class="weather">${data.weather[0].main}</h4>
                    <h4 class="desc" >${data.weather[0].description}</h4>
                    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" >
                    <div class="temp-container">
                        <div>
                            <h4 class="title">min</h4>
                            <h4 class="temp">${data.main.temp_min}&#176;</h4>
                        </div>
                        <div>
                            <h4 class="title">max</h4>
                            <h4 class="temp">${data.main.temp_max}&#176;</h4>
                        </div>
                        <div>
                            <h4 class="title">Feels like</h4>
                            <h4 class="temp">${data.main.feels_like}&#176;</h4>
                        </div>
                        <div>
                            <h4 class="title">Humidity</h4>
                            <h4 class="temp">${data.main.humidity}%</h4>
                        </div>
                    </div>
                `;
        })
            .catch(() =>{
                //display an error message if the city is not found 
                result.innerHTML = `<h3 class="msg">Failed to fetch weather data. Please try again.</h3>`
             });    

    }
};
//Attach event listeners to the search button and window load event
searchBtn.addEventListener("click" , getWeather);
