import React from 'react'
import '../MyProfile.css'

import data from '../data'
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';

import { getError } from '../utils';
import axios from 'axios';

//icon 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import PlaceIcon from '@mui/icons-material/Place';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

function MyProfile() {


    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { fullBox, cart, userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        window.location.href = '/login';
    };

    return (

        <div className='myprofile' >
            <Helmet>
       <title>My Profile</title>
     </Helmet>
            <div className='myprofile_desktop' >
                {userInfo ? (
                    <>
                        <div className='myprofile_desktop_left' >
                            <div className='myprofile_desktop_left_con' >
                                <div className='myprofile_desktop_left_top_nav' >
                                    <Link to='/'>
                                        <span className='myprofile_desktop_left_top_nav_left' >
                                            <ArrowBackIcon />
                                        </span>
                                    </Link>
                                    <Link to='/profile'>
                                        <span className='myprofile_desktop_left_top_nav_right' >
                                            <SettingsIcon />
                                        </span>
                                    </Link>
                                </div>
                                <img src={userInfo.image} alt='' className='myprofile_desktop_left_img' />
                            </div>
                        </div>
                        <div className='myprofile_desktop_right' >
                            <div className='myprofile_desktop_right_top_parent' >
                                <div className='myprofile_desktop_right_top_child_1' >
                                    <span className='myprofile_desktop_right_top_child_1_name' >@{userInfo.name},</span>
                                    <span className='myprofile_desktop_right_top_child_1_age' >{userInfo.age}</span>
                                </div>
                                <div className='myprofile_desktop_right_top_child_2' >
                                    <span className='myprofile_desktop_right_top_child_1_icon' ><PlaceIcon fontSize="small" /></span>
                                    <span className='myprofile_desktop_right_top_child_1_location' >{userInfo.city}</span>
                                </div>
                            </div>
                            <span className='myprofile_heading_1' >Interest</span>
                            <div className='myprofile_desktop_right_interest' >

                                <div className='myprofile_desktop_right_interest_card' >
                                    <span className='myprofile_desktop_right_interest_card_left' ><PlaceIcon fontSize="small" /></span>
                                    <span className='myprofile_desktop_right_interest_card_rigth' >Traveling</span>
                                </div>
                            </div>
                            <span className='myprofile_heading_2' >About</span>
                            <div className='myprofile_desktop_right_about' >
                                <div className='myprofile_desktop_right_about_con' >
                                {userInfo.about}
                                </div>
                            </div>

                        </div>
                    </>
                ) : (
                    <>
                    </>
                )}
            </div>
            <div className='myprofile_mobile' >
            {userInfo ? (
                    <>
                <div className='myprofile_mobile_top' >
                    <div className='myprofile_mobile_top_con' >
                        <div className='myprofile_mobile_top_top_nav' >
                            <Link to='/'>
                                <span className='myprofile_mobile_top_top_nav_left' >
                                    <ArrowBackIcon />
                                </span>
                            </Link>
                            <Link to='/profile'>
                                <span className='myprofile_mobile_top_top_nav_right' >
                                    <SettingsIcon />
                                </span>
                            </Link>
                        </div>
                        <img src={userInfo.image} alt='' className='myprofile_mobile_top_img' />
                    </div>
                </div>
                <div className='myprofile_mobile_bottom' >
                    <div className='myprofile_mobile_bottom_top_parent' >
                        <div className='myprofile_mobile_bottom_top_child_1' >
                            <span className='myprofile_mobile_bottom_top_child_1_name' >@{userInfo.name},</span>
                            <span className='myprofile_mobile_bottom_top_child_1_age' >{userInfo.age}</span>
                        </div>
                        <div className='myprofile_mobile_bottom_top_child_2' >
                            <span className='myprofile_mobile_bottom_top_child_1_icon' ><PlaceIcon fontSize="small" /></span>
                            <span className='myprofile_mobile_bottom_top_child_1_location' >{userInfo.city}</span>
                        </div>
                    </div> 
                    <span className='myprofile_heading_1' >Interest</span>
                    <div className='myprofile_mobile_bottom_interest' >

                        <div className='myprofile_mobile_bottom_interest_card' >
                            <span className='myprofile_mobile_bottom_interest_card_left' ><PlaceIcon fontSize="small" /></span>
                            <span className='myprofile_mobile_bottom_interest_card_rigth' >Traveling</span>
                        </div>
                    </div>
                    <span className='myprofile_heading_2' >About</span>
                    <div className='myprofile_mobile_bottom_about' >
                        <div className='myprofile_mobile_bottom_about_con' >
                        {userInfo.about}
                        </div>
                    </div>

                </div>
                </>
                ) : (
                    <>
                    </>
                )}
            </div>
        </div>

    )
}

export default MyProfile
