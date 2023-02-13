import React, { memo } from 'react';
import PropTypes from 'prop-types';

const CityListItem = ({ item }) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-center mb-3">
      <p>{item.cityName}</p>
      <p>{`${item.temp}°`}</p>
      <p>{item.weather}</p>
    </div>
  );
};

CityListItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number,
    cityName: PropTypes.string,
    temp: PropTypes.string,
    weather: PropTypes.string,
  }),
};

export default memo(CityListItem);
