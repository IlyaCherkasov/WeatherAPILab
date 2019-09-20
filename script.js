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

const templateOnError = `
    <p>Something went wrong... Try again, please.<p>
    <p>Response is: ${weather.status} ${weather.statusText}</p>
`;
async function handleClick(e) {
    e.preventDefault();
    let inputValue = document.getElementById('city').value;
    const outputField = document.getElementById('weather');
    outputField.innerHTML = await getWeatherData(inputValue);
}

async function getWeatherData(inputValue) {
    let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=${APIKey}`);
    if (weather.ok) {
        const jsonWeather = await weather.json();
        const html = Mustache.to_html(templateOnSuccess, jsonWeather);
        return html;
    } else {
        template = `
            <p>Something went wrong... Try again, please.<p>
            <p>Response is: ${weather.status} ${weather.statusText}</p>
        `;
        return templateOnError;
    }
}
