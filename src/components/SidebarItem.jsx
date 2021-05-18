import React from 'react';
import './SidebarItem.css';

//this is the component that handle each edit button for each image
const SidebarItem = ({name,active,handleClick}) => {

 return(
   <button className={`edit-btn ${active ? 'active' : ''}`} onClick={handleClick}>{name}</button>
 )
}
export default SidebarItem;
