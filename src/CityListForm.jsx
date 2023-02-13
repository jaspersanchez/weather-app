import React, { memo } from 'react';
import PropTypes from 'prop-types';

const CityListForm = ({ searchCity }, ref) => {
  return (
    <div className="w-full max-w-lg">
      <form
        onSubmit={searchCity}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 className="text-blue-600 text-2xl font-bold mb-4">Weather App</h1>
        <div className="flex">
          <input
            type="text"
            ref={ref}
            className="w-l rounded-l py-2 px-3 text-gray-700 flex-1"
            placeholder="City"
          />
          <button
            type="submit"
            className="py-2 px-4 rounded-r bg-blue-600 text-white"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

CityListForm.propTypes = {
  searchCity: PropTypes.func.isRequired,
};

export default memo(CityListForm);
