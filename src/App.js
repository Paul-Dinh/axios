import React, {useState, useEffect} from 'react';
import axios from 'axios';
import WeatherList from './WeatherList';
import AddWeather from './AddWeather';

function App() {
  const [data,setData] = useState({})
  const [location, setLocation] = useState('')
  
  //Lấy api
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=0a4b26fe50a993e1063e451603445e52`
  
  //Lưu data
  const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('weatherData'));
        if (storedData) {
            setWeatherData(storedData);
        }
    }, []);

    useEffect(() => {
      localStorage.setItem('weatherData', JSON.stringify(weatherData));
    }, [weatherData]);
  
  // Set location event
  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  // Lấy api city
  const fetchWeather = async (city) => {
    const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=0a4b26fe50a993e1063e451603445e52`;
    const response = await axios.get(url1);
    return response.data;
  };

  //Add weather
  const addWeatherData = async (city) => {
    try {
      const newWeather = await fetchWeather(city);
      setWeatherData((prevData) => [...prevData, newWeather]);
    } catch (error) {
      console.error("Error adding weather data:", error);
    }
  };

  //Edit weather
  const editWeatherData = async (oldCity, newCity) => {
    try {
      const newWeather = await fetchWeather(newCity);
      setWeatherData((prevData) => 
        prevData.map((data) => data.name === oldCity ? newWeather : data)
      );
    } catch (error) {
      console.error("Error editing weather data:", error);
    }
  };

  //Delete weather
  const deleteWeatherData = (city) => {
    setWeatherData((prevData) => prevData.filter((data) => data.name !== city));
  };

  return (
    <div className="app">
      <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text"
        />
      </div>
      <div className="container">
        <div className='top'>
          <div className='location'>
              <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp}°F</h1> : null}
          </div>
          <div className='description'>
            {data.main ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div>
          <AddWeather addWeatherData={addWeatherData} />
          <h2>Weather</h2>
          <div>
            <WeatherList 
                  weatherData = {weatherData} 
                  editWeatherData={editWeatherData} 
                  deleteWeatherData={deleteWeatherData} 
            />  
          </div>
        </div>

        {data.name !==undefined &&
        <div className='bottom'>
          <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like}°F</p> : null}
            <p>Feels Like</p>
          </div>
          <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className='wind'>
              {data.main ? <p className='bold'>{data.wind.speed}MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>

        }
      </div>
    </div>
  );
}

export default App;
