import React from 'react';
import ReactDOM from 'react-dom';
import CityInfo_old from './CityInfo_old';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CityInfo_old />, div);
  ReactDOM.unmountComponentAtNode(div);
});
