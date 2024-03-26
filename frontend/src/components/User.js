import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

import '../User.css'

//icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import InfoIcon from '@mui/icons-material/Info';

function User(props) {
  const { user } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

 

  return (
    
    <div className='Home_desktop_user_card_con' >
      <div className='Home_desktop_user_card' >
    <span className='Home_desktop_user_card_top' >{user.category}</span>
    <img src={user.image} alt='' className='Home_desktop_user_card_img' />
    <div className='Home_desktop_user_card_details' >
        <div className='Home_desktop_user_card_details_left' >
            <div className='Home_desktop_user_card_details_left_top' >
                
                <span className='Home_desktop_user_card_details_left_top_name' >@{user.name},</span>
                <span className='Home_desktop_user_card_details_left_top_age' >{user.age}</span>
              
            </div>
            <div className='Home_desktop_user_card_details_left_location_con' >
                <span className='Home_desktop_user_card_details_left_location_con_left' ><PlaceIcon fontSize="small" /></span>
                <span className='Home_desktop_user_card_details_left_location_con_right' >{user.country},{user.city}</span>
            </div>
        </div>
        <div className='Home_desktop_user_card_details_right' >
        <Link to={`/user/${user.slug}`}style={{textDecoration: 'none'}} >
            <span className='Home_desktop_user_card_details_right_btn' ><InfoIcon fontSize="large" /></span>
            </Link>
        </div>
    </div>
    </div>
</div>
  );
}
export default User;
