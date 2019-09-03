import React from 'react';
import ReactDOM from 'react-dom';
import CityInfo from './CityInfo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CityInfo />, div);
  ReactDOM.unmountComponentAtNode(div);
});
