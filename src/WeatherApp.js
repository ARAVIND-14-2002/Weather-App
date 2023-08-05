import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AppWrapper = styled.div`
width: 100%;
height: 100vh;
position: relative;
`;

const BackgroundImage = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
position: fixed;
top: 0;
left: 0;
z-index: -1;
background-image: url(${props => (props.theme === 'light' ? '/day.jpg' : '/night.jpg')});
`;

const Heading = styled.h1`
position: absolute;
top: 50px;
left: 50%;
transform: translateX(-50%);
color: white;
font-size: 40px;
font-family: 'Roboto';
font-weight: 900;
`;

const SearchContainer = styled.div`
  width: 300px; 
  height: 50px;
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.30;
  background: #D9D9D9;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  padding: 10px 20px;
  font-size: 20px; /* Changed font size to 16px */
  font-weight: Dark; /* Set font weight to medium */
  background: transparent;
  border: none;
  outline: none;
`;

const Button = styled.button`
  width: 100px;
  height: 100%;
  background: white;
  font-size:20px;
  font-color:white;
  border: none;
  outline: none;
  cursor: pointer;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-left: left; /* Align the button to the right end */
`;


const ResultBox = styled.div`
  width: 300px;
  max-height: 300px;
  overflow-y: auto;
  position: absolute;
  top: 220px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [theme, setTheme] = useState('day');

  const API_KEY = '3b4f0ccd015c7b8cf4d3117843f4fbca'; // Replace with your OpenWeatherMap API Key
  const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const updateThemeBasedOnTime = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
      setTheme('day'); // Set 'day' theme during 6 AM to 6 PM
    } else {
      setTheme('night'); // Set 'night' theme during 6 PM to 6 AM
    }
  };

  useEffect(() => {
    // Update the theme initially
    updateThemeBasedOnTime();

    // Interval to update the theme every minute
    const interval = setInterval(updateThemeBasedOnTime, 60000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Determine the background image URL based on the current theme
  const backgroundImageURL = theme === 'day' ? '/day.jpg' : '/night.jpg';

  return (
    <AppWrapper>
      <BackgroundImage src="/night.jpg" alt="Background" />
      <Heading>Weather App</Heading>
      <SearchContainer>
        <Input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="City"
        />
        <Button onClick={handleSearch}>Search</Button>
      </SearchContainer>
      {weatherData && (
        <ResultBox>
          <h2>{weatherData.name}</h2>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind: {weatherData.wind.speed} m/s</p>
        </ResultBox>
      )}
    </AppWrapper>
  );
};

export default WeatherApp;
