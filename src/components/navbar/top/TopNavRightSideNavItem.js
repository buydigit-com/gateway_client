// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import CartNotification from 'components/navbar/top/CartNotification';
// import NotificationDropdown from 'components/navbar/top/NotificationDropdown';
import ProfileDropdown from 'components/navbar/top/ProfileDropdown';
import AppContext from 'context/Context';
import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
// import NineDotMenu from './NineDotMenu';

const TopNavRightSideNavItem = () => {
  const {
    config: { isDark },
    setConfig
  } = useContext(AppContext);
  return (
    <Nav
      navbar
      className="navbar-nav-icons ms-auto flex-row align-items-center"
      as="ul"
    >
      <Nav.Item as={'li'}>
        <Nav.Link
          className="btn btn-danger text-white px-3 my-2 rounded-3 btn-sm me-2"
          style={{ paddingBottom: '5px', paddingTop: '5px' }}
          // onClick={() => setConfig('isDark', !isDark)}
        >
          Login
        </Nav.Link>
      </Nav.Item>

      {/* <CartNotification /> */}
      {/* <NotificationDropdown /> */}
      {/* <NineDotMenu /> */}
      <ProfileDropdown />
    </Nav>
  );
};

export default TopNavRightSideNavItem;
