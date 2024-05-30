import React, { useState } from 'react';

const WeatherList = ({ weatherData, editWeatherData, deleteWeatherData }) => {
    const [isEditing, setIsEditing] = useState(null);
    const [newCity, setNewCity] = useState('');

    const handleEdit = (city) => {
        setIsEditing(city);
        setNewCity('');
    };

    const handleSave = (oldCity) => {
        if (newCity) {
            editWeatherData(oldCity, newCity);
            setIsEditing(null);
        }
    };

    return (
        <div>
            {weatherData.map((data) => (
                <div key={data.id}>
                    {isEditing === data.name ? (
                        <div>
                            <input 
                                type="text" 
                                value={newCity} 
                                onChange={(e) => setNewCity(e.target.value)} 
                                placeholder="Enter new city name" 
                            />
                            <button onClick={() => handleSave(data.name)}>Save</button>
                            <button onClick={() => setIsEditing(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <h3>{data.name}</h3>
                            <p>{data.weather[0].description}, {data.main.temp}°F</p>
                            <button onClick={() => handleEdit(data.name)}>Edit</button>
                            <button onClick={() => deleteWeatherData(data.name)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default WeatherList;
