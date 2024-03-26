import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';

import '../Likes.css'

//icons
import VerifiedIcon from '@mui/icons-material/Verified';
import PlaceIcon from '@mui/icons-material/Place';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import MobileHeader from '../components/MobileHeader';

import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import InterestsIcon from '@mui/icons-material/Interests';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import DesktopHeader from '../components/DesktopHeader';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_POST':
      return { ...state, post: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, post: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreenPostMeLikes() {
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, post, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      post: [],
      loading: true,
      error: '',
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/posts/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === post._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/posts/${post._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...post, quantity },
    });
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment) {
      toast.error('Please enter comment ');
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/posts/${post._id}/reviews`,
        { comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Review submitted successfully');
      post.reviews.unshift(data.review);
      post.numReviews = data.numReviews;

      dispatch({ type: 'REFRESH_POST', payload: post });
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className='likes' >
      <Helmet>
        <title>{post.name}</title>
      </Helmet>
      <div className='likes_desktop' >
        <DesktopHeader />
        {post.likes.map((like) => (
          <div className='likes_desktop_card' key={like._id}>
            <div className='likes_desktop_card_left' >
              <img src={like.image} alt='' className='likes_desktop_card_left_img' />
            </div>
            <div className='likes_desktop_card_center' >
              <div className='likes_desktop_card_center_child_1' >
                <div className='likes_desktop_card_center_child_1_top' >
                  <span className='likes_desktop_card_center_child_1_top_name' >{like.name},</span>
                  <span className='likes_desktop_card_center_child_1_top_age' >{like.age}</span>
                  <span className='likes_desktop_card_center_child_1_top_verified' ><VerifiedIcon /></span>
                </div>
                <div className='likes_desktop_card_center_child_1_bottom' > 
                  <span className='likes_desktop_card_center_child_1_bottom_location_icon' >
                    <PlaceIcon />
                  </span>
                  <span className='likes_desktop_card_center_child_1_bottom_location_country' >{like.country}</span>,
                  <span className='likes_desktop_card_center_child_1_bottom_location_city' >{like.city}</span>
                </div>
              </div>
              <div className='likes_desktop_card_center_user_info' >
                <div className='likes_desktop_card_center_user_info_con' >
                  <span className='likes_desktop_card_center_user_info_con_left' >
                    <LocationCityIcon />
                  </span>
                  <span className='likes_desktop_card_center_user_info_con_right' >{like.city}</span>
                </div>
                <div className='likes_desktop_card_center_user_info_con' >
                  <span className='likes_desktop_card_center_user_info_con_left' >
                    <SchoolIcon />
                  </span>
                  <span className='likes_desktop_card_center_user_info_con_right' >{like.school}</span>
                </div>
                <div className='likes_desktop_card_center_user_info_con' >
                  <span className='likes_desktop_card_center_user_info_con_left' >
                    <FavoriteIcon />
                  </span>
                  <span className='likes_desktop_card_center_user_info_con_right' >{like.category}</span>
                </div>
              </div>
            </div>
            <div className='likes_desktop_card_right' >
              <div className='likes_desktop_card_right_child_2' >
                <Link style={{ textDecoration: 'none' }} to={`${like.instagram}`}> 
                  <span className='likes_desktop_card_right_child_2_icon_instagram' >
                    <InstagramIcon />
                  </span>
                </Link>
                <Link style={{ textDecoration: 'none' }}  to={`tel:${like.phone}`}>
                  <span className='likes_desktop_card_right_child_2_icon_phone' >
                    <PhoneIcon />
                  </span>
                </Link>
                <Link style={{ textDecoration: 'none' }} to={`tel:${like.whatsapp}`}>
                  <span className='likes_desktop_card_right_child_2_icon_whatsapp' >
                    <WhatsAppIcon />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className='likes_mobile' >
<MobileHeader />
      {post.likes.map((like) => (
          <div className='likes_desktop_card' key={like._id}>
            <div className='likes_desktop_card_left' >
              <img src={like.image} alt='' className='likes_desktop_card_left_img' />
            </div>
            <div className='likes_desktop_card_center' >
              <div className='likes_desktop_card_center_child_1' >
                <div className='likes_desktop_card_center_child_1_top' >
                  <span className='likes_desktop_card_center_child_1_top_name' >{like.name},</span>
                  <span className='likes_desktop_card_center_child_1_top_age' >{like.age}</span>
                  <span className='likes_desktop_card_center_child_1_top_verified' ><VerifiedIcon /></span>
                </div>
                <div className='likes_desktop_card_center_child_1_bottom' >
                  <span className='likes_desktop_card_center_child_1_bottom_location_icon' >
                    <PlaceIcon />
                  </span>
                  <span className='likes_desktop_card_center_child_1_bottom_location_country' >{like.country}</span>,
                  <span className='likes_desktop_card_center_child_1_bottom_location_city' >{like.city}</span>
                </div>
              </div>
              <div className='likes_desktop_card_center_user_info' >
                <div className='likes_desktop_card_center_user_info_con' >
                  <span className='likes_desktop_card_center_user_info_con_left' >
                    <LocationCityIcon />
                  </span>
                  <span className='likes_desktop_card_center_user_info_con_right' >{like.city}</span>
                </div>
                <div className='likes_desktop_card_center_user_info_con' >
                  <span className='likes_desktop_card_center_user_info_con_left' >
                    <SchoolIcon />
                  </span>
                  <span className='likes_desktop_card_center_user_info_con_right' >{like.school}</span>
                </div>
                <div className='likes_desktop_card_center_user_info_con' >
                  <span className='likes_desktop_card_center_user_info_con_left' >
                    <FavoriteIcon />
                  </span>
                  <span className='likes_desktop_card_center_user_info_con_right' >{like.category}</span>
                </div>
              </div>

              <div className='likes_mobile_card_right' >
              <div className='likes_mobile_card_right_child_2' >
                <Link style={{ textDecoration: 'none' }} to={`${like.instagram}`}>
                  <span className='likes_mobile_card_right_child_2_icon_instagram' >
                    <InstagramIcon />
                  </span>
                </Link>
                <Link style={{ textDecoration: 'none' }} to={`tel:${like.phone}`}>
                  <span className='likes_mobile_card_right_child_2_icon_phone' >
                    <PhoneIcon />
                  </span>
                </Link>
                <Link style={{ textDecoration: 'none' }} to={`tel:${like.whatsapp}`}>
                  <span className='likes_mobile_card_right_child_2_icon_whatsapp' >
                    <WhatsAppIcon />
                  </span>
                </Link>
              </div>
            </div>

            </div>
           
          </div>
        ))}

      </div>
    </div>
  );
}
export default ProductScreenPostMeLikes;
