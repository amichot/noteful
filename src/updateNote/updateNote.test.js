import React from 'react';
import ReactDOM from 'react-dom';
import UpdateNote from './UpdateNote';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: {params: {}},
    history: {
      push: () => {},
    },
  };
  ReactDOM.render(<UpdateNote {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
