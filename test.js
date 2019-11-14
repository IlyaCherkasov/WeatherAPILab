mocha = require('mocha');
expect = require('chai').expect;
jsdom = require('mocha-jsdom');
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

fetch = () => 'This is sample return';

const functions = require('./script');

describe('testing everything', () => {
  it('handleWeatherData', async () => {
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

  it('addElementToHTML', () => {
    const result = functions().addElementToHTML('<p>The weather is weather</p>');
  });

  it('getWeatherData', async () => {
    const result = await functions().getWeatherData('Moscow');
    expect(result).to.equal('This is sample return');
  });

  it('handleSubmit', async () => {
    const result = await functions().handleSubmit({
      preventDefault: () => {},
      target: [{ value: '' }]
    });
    expect(result).to.equal('Empty value');
  });
});