import React from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../slices/authSlice';
import { setTasksAfterLogout } from '../../slices/tasksSlice';

const Header = () => {
  const {user} = useSelector((state) => state.auth)
  // const {tasks} = useSelector((state) => state.tasks)

  const dispatch = useDispatch()

  return (
    <div className='Header-wrapper '>
    <div className="innerDiv p-3">
    <h1 className='projectName'><span><img src='https://img.icons8.com/ios/50/000000/project-management.png'/></span>Project Management Board</h1>

    {
      user 
      ? (<Dropdown className='dropDown'>
        <Dropdown.Toggle
          variant="secondary"
          id="dropdown-basic"
          className="profile-dropdown"
        >
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg" 
            alt="Profile"
            className="profile-image"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
          <Dropdown.Item  onClick={() => {
            dispatch(setTasksAfterLogout())
            dispatch(logOut())
            }}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>) 
      : (() => {})
    }
      
    </div>
      
    </div>
  );
}

export default Header;
