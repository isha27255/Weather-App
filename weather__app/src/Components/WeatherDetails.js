import React, { useState} from 'react'
import axios from 'axios'

function WeatherDetails() {

    const [search, setSearch] = useState('')
    const [weather, setWeather] = useState([])

    const searches = e => {
        
        if(e.key === "Enter")
        {
            setWeather('')
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_API_KEY}`)
            .then(res => {
                setWeather(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }
       
    }
    return (
        <div class={(typeof weather.main != "undefined") ? weather.weather[0].main : 'default'}>
            
            <input
                type="text"
                className="searchbox"
                placeholder="Search..."
                onChange={e => setSearch(e.target.value)}
                onKeyPress={searches}>
            </input>
            
            
            {(typeof weather.main != "undefined")?
            (
                <div>
                    
                    <h2 class={weather.weather[0].main === 'Mist' || weather.weather[0].main === 'Rain' ? 'xyz':'abc'}>{weather.name}, {weather.sys.country}</h2>
                    
                    <br></br>
                    
                   <div class="temp-box">
                   <p>{ Math.round(weather.main.temp -273)}C</p>

                   </div>
                   <br></br>
                   <h1 class={weather.weather[0].main === 'Mist' || weather.weather[0].main === 'Rain' ? 'xyz':'abc'}>{weather.weather[0].main}</h1>
                   <br></br>
                </div>
            ): (
                <h1 class="def-heading">Weather App - Enter a city to get its weather details</h1>
            )}
            
        </div>
    )
}

export default WeatherDetails
