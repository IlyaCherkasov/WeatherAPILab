mocha = require('mocha');
expect = require('chai').expect;
Mustache = require('mustache');

global.document = {
  getElementById: (arg) => {
    return {
      innerHTML: () => '',
      addEventListener: () => '',
      appendChild: () => ''
    };
  },
  createElement: (arg) => {
    return {
      innerHTML: '',
      id: '',
      className: ''
    };
  }
};

const functions = require('./script');

// TODO: change desc
describe('script.js', () => {
  beforeEach(() => fetch = () => 'This is sample return');

  it('handleWeatherData weather.ok = true', async () => {
    const result = await functions().handleWeatherData({
      ok: true,
      json: () => { return {
        weather: {description: 'weather'},
        main: {temp: 283, humidity: 10, pressure: 10000},
        wind: {speed: 10}
      }},
    });
    expect(result).to.equal(`
        <p>The weather is weather</p>
        <p>The temperature is 283 in Kelvins</p>
        <p>The humidity is 10%</p>
        <p>The pressure is 10000 hPa</p>
        <p>The wind is 10 meters per hour</p>
`);
  });

  it('handleWeatherData weather.ok = false', async () => {
    const result = await functions().handleWeatherData({
      ok: false,
      json: () => { return {
        cod: 47,
        message: 'fool test'
      }},
    });
    expect(result).to.equal(`
    <p>Something went wrong... Try again, please.<p>
    <p>Response is: 47 fool test</p>
`);
  });

  it('handleWeatherData weather.ok = undefined', async () => {
    const result = await functions().handleWeatherData({
      json: () => { return {
        cod: 47,
        message: 'fool test'
      }},
    });
    expect(result).to.equal(`
    <p>Something went wrong... Try again, please.<p>
    <p>Response is: 47 fool test</p>
`);
  });

  it('addElementToHTML function', () => {
    const result = functions().addElementToHTML('<p>The weather is weather</p>');
  });

  it('getWeatherData function', async () => {
    const result = await functions().getWeatherData('Moscow');
    expect(result).to.equal('This is sample return');
  });

  it('handleSubmit with empty target value', async () => {
    const result = await functions().handleSubmit({
      preventDefault: () => {},
      target: [{ value: '' }]
    });
    expect(result).to.equal('Empty value');
    // TODO: check if functions were called
  });

  it('handleSubmit with non-empty target value', async () => {
    let addElementToHTMLCount = 0;
    // TODO: mock functions with sinon mb
    let handleWeatherDataCount = 0;
    let getWeatherDataCount = 0;
    functions().addElementToHTML = () => { addElementToHTMLCount += 1; };
    functions().handleWeatherData = () => { handleWeatherDataCount += 1; };
    functions().getWeatherData = () => { getWeatherDataCount += 1; };
    const result = await functions().handleSubmit({
      preventDefault: () => {},
      target: [{ value: 'Moscow' }]
    });
    expect(addElementToHTMLCount).to.equal(1);
  });
});