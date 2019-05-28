//dependencies
import React from 'react';
import {NavLink, Link} from 'react-router-dom';
//components
import FolderItem from './FolderItem';
//context
import NotefulsContext from '../NotefulsContext';
//css
import './MainSidebar.css';

export default class MainSidebar extends React.Component {
  static contextType = NotefulsContext;

  static defaultProps = {
    folders: [],
  };
  render() {
    const {folders = []} = this.context;
    if (!folders || folders.length <= 0) {
      // Display a message or Show a Loading Gif here
      return <div>Loading...</div>;
    }
    return (
      <div>
        <ul className="foldersList" aria-live="polite">
          {folders.map(folder => (
            <NavLink
              key={folder.id}
              className="MainSidebar__folderLink"
              to={`/folder/${folder.id}`}
            >
              <FolderItem key={folder.id} {...folder} />
            </NavLink>
          ))}
          <Link to="/add-folder" type="button" className="add-folder-button">
            Add Folder
          </Link>
        </ul>
      </div>
    );
  }
}
