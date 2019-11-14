const APIKey = 'e34c51f8b71bca2945c6901e59dc5b69';
const templateOnSuccess= `
    {{#weather}}
        <p>The weather is {{description}}</p>
    {{/weather}}
    {{#main}}
        <p>The temperature is {{temp}} in Kelvins</p>
        <p>The humidity is {{humidity}}%</p>
        <p>The pressure is {{pressure}} hPa</p>
    {{/main}}
    {{#wind}}
        <p>The wind is {{speed}} meters per hour</p>
    {{/wind}}
`;

document.getElementById('weatherForm').addEventListener('submit', handleSubmit);

const templateOnError = `
    <p>Something went wrong... Try again, please.<p>
    <p>Response is: {{cod}} {{message}}</p>
`;

async function handleSubmit(e) {
    e.preventDefault();
    if (e.target[0].value === ''){
        addElementToHTML('<p>Nothing to search. You need to write something.</p>')
        return 'Empty value';
    }
    addElementToHTML(await handleWeatherData(await getWeatherData(e.target[0].value)));
}

async function getWeatherData(inputValue) {
    let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=${APIKey}`);
    return weather;
}

async function handleWeatherData(weatherData) {
    if (weatherData.ok) {
        const jsonWeather = await weatherData.json();
        const html = Mustache.to_html(templateOnSuccess, jsonWeather);
        return html;
    }
    const jsonWeather = await weatherData.json();
    const html = Mustache.to_html(templateOnError, jsonWeather);
    return html;
}

function addElementToHTML(html) {
    const outputField = document.getElementById('weather');
    outputField.innerHTML = html;
}

module.exports = () => {
    return {
        handleWeatherData,
        addElementToHTML,
        getWeatherData,
        handleSubmit
    };
};