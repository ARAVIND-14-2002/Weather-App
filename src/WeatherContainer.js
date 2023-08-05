import styled from 'styled-components';

const WeatherContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  max-width: 400px;

  h2 {
    font-size: 28px;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 18px;
    margin: 5px 0;
    color: #555;
  }

  .description {
    font-weight: bold;
  }

  .temperature {
    font-size: 24px;
  }

  .humidity,
  .wind {
    color: #777;
  }
`;

export default WeatherContainer;
