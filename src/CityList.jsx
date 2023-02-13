import React, { memo } from 'react';
import CityListItem from './CityListItem';
import PropTypes from 'prop-types';

const CityList = ({ cityList }) => {
  return (
    <div className="flex flex-col justify-center w-full max-w-lg">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-3 gap-4 mb-2 text-center">
          <p className="text-lg font-semibold">City</p>
          <p className="text-lg font-semibold">Temperature</p>
          <p className="text-lg font-semibold">Weather</p>
        </div>
        {cityList.map(item => (
          <CityListItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

CityList.propTypes = {
  cityList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      cityName: PropTypes.string,
      temp: PropTypes.string,
      weather: PropTypes.string,
    }),
  ).isRequired,
};

export default memo(CityList);
