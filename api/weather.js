

// function that fetch the current weather by current location
export async function getWeatherInCurrentLocation(lat, lon) {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=232bc137f712ebe71460f080e6541be6`)

        if (response.ok) {
            const data = await response.json();

            const weatherForecast = await get5DaysForecast(lat, lon);

            return [data, weatherForecast]
            
        } else {
            console.log('fetching current weather is failed')
        }

    } catch (error) {
        console.log(error)
    }
}


// function that fetch the current weather by city selected
async function getCurrentWeather(city, country) {

    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=232bc137f712ebe71460f080e6541be6`)

        if (response.ok) {
            const data = await response.json();

            return data;
        } else {
            console.log('fetching current weather is failed')
        }

    } catch (error) {
        console.log(error)
    }

}

// function that fetch the weather forecast by city selected
async function get5DaysForecast(lat, lon) {

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=232bc137f712ebe71460f080e6541be6`)

        if (response.ok) {
            const data = await response.json();

            return data;
        } else {
            console.log('Fetching weather forecast is failed')
        }

    } catch (error) {
        console.log(error)
    }

}

export async function getWeather(data){

    try {
        const currentWeather = await getCurrentWeather(data.name, data.country[0]);
        const weatherForecast = await get5DaysForecast(data.lat, data.lon);

        if(!currentWeather || !weatherForecast){
            return console.log('Failed to fetch data')
        }

        return [currentWeather, weatherForecast];

    } catch (error) {
        console.error('Failed to fetch data')
    }
}

