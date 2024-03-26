
import '../MobileHeader.css'
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';

//drawer 
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


//icon
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import InterestsIcon from '@mui/icons-material/Interests';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

function MobileHeader() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };


  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className='mobile_header' >
      <div className='mobile_header_left' >


        <button className="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" >
          <MenuIcon />
        </button>


      </div>
      <div className='mobile_header_center' >
        <Link to='/' style={{ textDecoration: 'none' }} >
          <img src='/logo.png' alt='' className='mobile_header_center_logo' />
        </Link>
      </div>

      <div className='mobile_header_right' >
       



          <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div class="offcanvas-header">
             
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              {userInfo ? (
                <div className='mobile_header_drawer' >
                  <div className='mobile_header_drawer_left' >

                    <div className='mobile_header_drawer_left_center'>
                      <Link to='/' style={{ textDecoration: 'none' }} >
                        <div className='mobile_header_drawer_left_center_link_con' >
                          <span className='mobile_header_drawer_left_center_link_con_left' >
                            <HomeIcon />
                          </span>
                          <span className='mobile_header_drawer_left_center_link_con_right' >Home</span>
                        </div>
                      </Link>
                     
                      <Link to='/search' style={{ textDecoration: 'none' }} >
                        <div className='mobile_header_drawer_left_center_link_con' >
                          <span className='mobile_header_drawer_left_center_link_con_left' >
                            <SearchIcon />
                          </span>
                          <span className='mobile_header_drawer_left_center_link_con_right' >Explore</span>
                        </div>
                      </Link>
                      <Link to='/profile' style={{ textDecoration: 'none' }} >
                        <div className='mobile_header_drawer_left_center_link_con' >
                          <span className='mobile_header_drawer_left_center_link_con_left' >
                            <PersonIcon />
                          </span>
                          <span className='mobile_header_drawer_left_center_link_con_right' >Profile</span>
                        </div>
                      </Link>
                     
                      <Link to={`/date/${userInfo._id}`} style={{ textDecoration: 'none' }} >
                        <div className='mobile_header_drawer_left_center_link_con' >
                          <span className='mobile_header_drawer_left_center_link_con_left' >
                            <FavoriteIcon />
                          </span>
                          <span className='mobile_header_drawer_left_center_link_con_right' >Dating Profile</span>
                        </div>
                      </Link>
                     
                    </div>
                    <div className='mobile_header_drawer_left_bottom' >

                      <button type='submit' onClick={signoutHandler} className='mobile_header_drawer_left_bottom_logout' >
                        LOG OUT
                      </button>

                    </div>
                  </div>
                </div>

              ) : (
                <div className='mobile_header_drawer' >
                  <div className='mobile_header_drawer_left' >

                    <div className='mobile_header_drawer_left_center'>
                      <Link to='/' style={{ textDecoration: 'none' }} >
                        <div className='mobile_header_drawer_left_center_link_con' >
                          <span className='mobile_header_drawer_left_center_link_con_left' >
                            <HomeIcon />
                          </span>
                          <span className='mobile_header_drawer_left_center_link_con_right' >Home</span>
                        </div>
                      </Link>
                  
                   
                      <Link to='/search' style={{ textDecoration: 'none' }} >
                        <div className='mobile_header_drawer_left_center_link_con' >
                          <span className='mobile_header_drawer_left_center_link_con_left' >
                            <SearchIcon />
                          </span>
                          <span className='mobile_header_drawer_left_center_link_con_right' >Explore</span>
                        </div>
                      </Link>
                     
                    </div>
                    <div className='mobile_header_drawer_left_bottom' >
                      <Link to='/signin' style={{ textDecoration: 'none' }}>
                        <span className='mobile_header_drawer_left_bottom_login' >
                          Login
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>



       

      </div>



    </div>
  )
}

export default MobileHeader
