import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import NoteItem from './NoteItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    id: '123',
    name: 'test title',
    folder_id: 1,
    content: 'test desciption',
    onClickDelete: () => {},
  };
  ReactDOM.render(
    <BrowserRouter>
      <NoteItem {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
