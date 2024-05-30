import React, { useState } from 'react';

const AddWeather = ({ addWeatherData }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            addWeatherData(city);
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="Enter city name" 
            />
            {/* <button type="submit">Add Weather</button> */}
        </form>
    );
};

export default AddWeather;
