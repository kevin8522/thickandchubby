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

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    
    <div className='Home_desktop_user_card_con' >
      <div className='Home_desktop_user_card' >
    <span className='Home_desktop_user_card_top' >{product.category}</span>
    <img src={product.image} alt='' className='Home_desktop_user_card_img' />
    <div className='Home_desktop_user_card_details' >
        <div className='Home_desktop_user_card_details_left' >
            <div className='Home_desktop_user_card_details_left_top' >
                
                <span className='Home_desktop_user_card_details_left_top_name' >@{product.name},</span>
                <span className='Home_desktop_user_card_details_left_top_age' >{product.age}</span>
              
            </div>
            <div className='Home_desktop_user_card_details_left_location_con' >
                <span className='Home_desktop_user_card_details_left_location_con_left' ><PlaceIcon fontSize="small" /></span>
                <span className='Home_desktop_user_card_details_left_location_con_right' >{product.country},{product.city}</span>
            </div>
        </div>
        <div className='Home_desktop_user_card_details_right' >
        <Link to={`/userprofile/${product.slug}`}style={{textDecoration: 'none'}} >
            <span className='Home_desktop_user_card_details_right_btn' ><InfoIcon fontSize="large" /></span>
            </Link>
        </div>
    </div>
    </div>
</div>
  );
}
export default Product;
