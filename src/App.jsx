import React, { createRef, PureComponent } from 'react';
import CityList from './CityList';
import CityListForm from './CityListForm';
import clsx from 'clsx';
import { LocaleConsumer } from './LocaleProvider';

export default class App extends PureComponent {
  state = {
    cityList: [],
    appStatus: [],
  };

  searchText = createRef();

  loadStatus = ({ type, id = -1 }) => {
    this.setState(({ appStatus }) => ({
      appStatus: [...appStatus, { type, action: 'REQUEST', id }],
    }));
  };

  errorStatus = ({ type, id = -1, error }) => {
    this.setState(({ appStatus }) => ({
      appStatus: appStatus.map(x => {
        if (x.type === type && x.id === id) {
          return { ...x, action: 'ERROR', errorMessage: error.message };
        }
        return x;
      }),
    }));
  };

  successStatus = ({ type, id = -1 }) => {
    this.setState(({ appStatus }) => ({
      appStatus: appStatus.filter(x => !(x.type === type && x.id === id)),
    }));
  };

  searchCity = async event => {
    const type = 'LOAD_TODO';
    try {
      this.loadStatus({ type });
      event.preventDefault();
      const searchText = this.searchText.current.value;
      let url = 'http://localhost:3000/cityList';
      url += `?cityName=${searchText}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      }

      const error = {
        message: 'No records found',
      };

      if (data.length === 0) {
        this.setState({
          cityList: [],
        });
        return this.errorStatus({ type, error });
      }

      this.setState({ cityList: data });
      this.successStatus({ type });
    } catch (error) {
      this.errorStatus({ type, error });
    }
  };

  clearWeather = () => {
    this.setState({
      cityList: [],
    });
  };

  render() {
    const { cityList, appStatus } = this.state;

    const loadWeatherStatus = appStatus.find(x => x.type === 'LOAD_TODO');

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <LocaleConsumer>
          {({ locale, setLocale }) => (
            <div>
              <p>The locale is: {locale}</p>
              <button onClick={() => setLocale(!true)}>
                Switch to Japanese Locale
              </button>
            </div>
          )}
        </LocaleConsumer>
        <CityListForm
          ref={this.searchText}
          searchCity={this.searchCity}
          status={loadWeatherStatus}
        />
        {loadWeatherStatus?.action === 'REQUEST' && <h1>Loading...</h1>}
        {loadWeatherStatus?.action === 'ERROR' && (
          <h1>{loadWeatherStatus.errorMessage}</h1>
        )}
        {cityList.length > 0 && <CityList cityList={cityList} />}
        <div className="w-full flex justify-end max-w-lg">
          <button
            onClick={this.clearWeather}
            className={clsx('w-1/4 rounded bg-red-500 text-white px-4 py-2', {
              'opacity-50 cursor-not-allowed': cityList.length === 0,
            })}
            disabled={cityList.length === 0}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}
