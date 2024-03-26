import React from 'react'
import {  Link  } from 'react-router-dom';
import '../Header.css'

import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';

import SearchForm from './SearchForm'


//icons 

import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import StoreIcon from '@mui/icons-material/Store';

function DesktopHeader() {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  return (
    <div className='desktop_header' >
    <div className='desktop_header_left' >
      <Link style={{textDecoration: 'none'}} to='/' >
        <img src='/logo.png' alt=''  className='desktop_header_left_logo' />
        </Link>
    </div>
    <div className='desktop_header_center' >
    <SearchForm />
    </div>

    

    <div className='desktop_header_right' >

       
     

      {userInfo ? (
                 <div className='desktop_header_right_link_con' >
                
                 
                
                 <Link style={{textDecoration: 'none'}} to='/' >
                 <span className='desktop_header_home_right_link' ><HomeIcon /></span>
                 </Link>
      
                 <Link style={{textDecoration: 'none'}} to='/search' >
                 <span className='desktop_header_right_link' ><SearchIcon /></span>
                 </Link>
                  <Link style={{textDecoration: 'none'}}to='/profile' > 
                 <span className='desktop_header_right_link' ><PersonIcon /></span>
                 </Link>

                 {userInfo.image ? (
                 <>
                 <Link style={{textDecoration: 'none'}} to={`/date/${userInfo._id}`} > 
                 <span className='desktop_header_right_link' ><FavoriteIcon /></span>
                 </Link>
                 </>
                 ):(
                 <>

                 </>
                 ) }
                 
                
                 <button  onClick={signoutHandler} className='desktop_header_right_link_logout' ><LockIcon /></button>
                 </div>
                ) : ( 
                  <div className='desktop_header_right_link_con' >
                    
                  <Link style={{textDecoration: 'none'}} to='/' >
                  <span className='desktop_header_home_right_link' ><HomeIcon /></span>
                  </Link>
                
                 
                  <Link style={{textDecoration: 'none'}} to='/search' >
                  <span className='desktop_header_right_link' ><SearchIcon /></span>
                  </Link>
                  <Link style={{textDecoration: 'none'}} to='/signin' >
                  <span className='desktop_header_right_link_logoin' ><LockIcon /></span>
                  </Link>

                  </div>
                )}
  
    </div>
  </div>
  ) 
}

export default DesktopHeader
