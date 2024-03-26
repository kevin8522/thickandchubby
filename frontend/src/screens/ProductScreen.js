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

import '../UserProfile.css'

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

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductScreen() {
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
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
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error('Please enter comment and rating');
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/products/${product._id}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Review submitted successfully');
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: 'REFRESH_PRODUCT', payload: product });
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
    <div className='user_profile' >
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <div className='user_profile_desktop' >
        <div className='user_profile_desktop_con' >
          <div className='user_profile_desktop_con_left' >
            <div className='user_profile_desktop_con_left_con' >
              <div className='user_profile_desktop_con_left_top_nav' >
                <Link to="/" style={{ textDecoration: 'none' }} >
                  <div className='user_profile_desktop_con_left_top_nav_left' >
                    <ArrowBackIcon />
                  </div>
                </Link>
              </div>
              <img src={product.image} alt={product.name} className='user_profile_desktop_con_left_img' />
            </div>
          </div>
          <div className='user_profile_desktop_con_right' >
            <div className='user_profile_desktop_con_right_con' >
              <div className='user_profile_desktop_con_right_child_1' >
                <div className='user_profile_desktop_con_right_child_1_top' >
                  <span className='user_profile_desktop_con_right_child_1_top_name' >{product.name},</span>
                  <span className='user_profile_desktop_con_right_child_1_top_age' >{product.age}</span>
                  <span className='user_profile_desktop_con_right_child_1_top_verified' ><VerifiedIcon /></span>
                </div>
                <div className='user_profile_desktop_con_right_child_1_bottom' >
                  <span className='user_profile_desktop_con_right_child_1_bottom_location_icon' >
                    <PlaceIcon />
                  </span>
                  <span className='user_profile_desktop_con_right_child_1_bottom_location_city' >{product.country}</span>,
                  <span className='user_profile_desktop_con_right_child_1_bottom_location_city' >{product.city}</span>
                </div>
              </div>
              <div className='user_profile_desktop_con_right_user_info' >
                  <div className='user_profile_desktop_con_right_user_info_con' >
                    <span className='user_profile_desktop_con_right_user_info_con_left' >
                    <LocationCityIcon />
                    </span>
                    <span className='user_profile_desktop_con_right_user_info_con_right' >{product.city}</span>
                  </div>
                  <div className='user_profile_desktop_con_right_user_info_con' >
                    <span className='user_profile_desktop_con_right_user_info_con_left' >
                    <SchoolIcon />
                    </span>
                    <span className='user_profile_desktop_con_right_user_info_con_right' >{product.school}</span>
                  </div>
                  <div className='user_profile_desktop_con_right_user_info_con' >
                    <span className='user_profile_desktop_con_right_user_info_con_left' >
                    <FavoriteIcon />
                    </span>
                    <span className='user_profile_desktop_con_right_user_info_con_right' >{product.category}</span>
                  </div>
              </div>
              <div className='user_profile_desktop_con_right_child_2' >
              <Link style={{textDecoration: 'none'}}  to={`${product.instagram}`}>
            <span className='user_profile_desktop_con_right_child_2_icon_instagram' >
              <InstagramIcon />
            </span>
            </Link>
            <Link style={{textDecoration: 'none'}}  to={`tel:${product.phone}`}>
            <span className='user_profile_desktop_con_right_child_2_icon_phone' >
              <PhoneIcon />
            </span>
            </Link>
            <Link style={{textDecoration: 'none'}}  to={`tel:${product.whatsapp}`}>
            <span className='user_profile_desktop_con_right_child_2_icon_whatsapp' >
              <WhatsAppIcon />
            </span>
            </Link>
              </div>
              <div className='user_profile_desktop_con_right_child_3' >
                <span className='user_profile_desktop_con_right_child_3_title' >About Me</span>
                <p>{product.about}</p>

              </div>
            </div>
          </div>
        </div>

      </div>
      <div className='user_profile_mobile' >
        <div className='user_profile_mobile_img_con' >
          <div className='user_profile_mobile_img_con_top' >
            <Link style={{textDecoration: 'none'}}  to='/'>
            <span className='user_profile_mobile_img_con_top_btn' >
              <ArrowBackIcon />
            </span>
            </Link>
          </div>
          <img src={product.image} className='user_profile_mobile_img' alt='' />
        </div>
        <div className='user_profile_mobile_details' >
          <div className='user_profile_mobile_details_child_1' >
            <div className='user_profile_mobile_details_child_1_top' >
              <span className='user_profile_mobile_details_child_1_top_name' >{product.name},</span>
              <span className='user_profile_mobile_details_child_1_top_age' >{product.age}</span>
              <span className='user_profile_mobile_details_child_1_top_verified' ><VerifiedIcon /></span>
            </div>
            <div className='user_profile_mobile_details_child_1_bottom' >
              <span className='user_profile_mobile_details_child_1_bottom_location_icon' >
                <PlaceIcon />
              </span>
              <span className='user_profile_mobile_details_child_1_bottom_location_city' >{product.country}</span>
              <span className='user_profile_mobile_details_child_1_bottom_location_city' >{product.city}</span>
            </div>
          </div>
          <div className='user_profile_mobile_con_right_user_info' >
                  <div className='user_profile_mobile_con_right_user_info_con' >
                    <span className='user_profile_mobile_con_right_user_info_con_left' >
                    <LocationCityIcon />
                    </span>
                    <span className='user_profile_mobile_con_right_user_info_con_right' >{product.city}</span>
                  </div>
                  <div className='user_profile_mobile_con_right_user_info_con' >
                    <span className='user_profile_mobile_con_right_user_info_con_left' >
                    <SchoolIcon />
                    </span>
                    <span className='user_profile_mobile_con_right_user_info_con_right' >{product.school}</span>
                  </div>
                  <div className='user_profile_mobile_con_right_user_info_con' >
                    <span className='user_profile_mobile_con_right_user_info_con_left' >
                    <FavoriteIcon />
                    </span>
                    <span className='user_profile_mobile_con_right_user_info_con_right' >{product.category}</span>
                  </div>
              </div>
          <div className='user_profile_mobile_details_child_2' >
              <Link style={{textDecoration: 'none'}}  to={`${product.instagram}`}>
            <span className='user_profile_mobile_con_right_child_2_icon_instagram' >
              <InstagramIcon />
            </span>
            </Link>
            <Link style={{textDecoration: 'none'}}  to={`tel:${product.phone}`}>
            <span className='user_profile_mobile_con_right_child_2_icon_phone' >
              <PhoneIcon />
            </span>
            </Link>
            <Link style={{textDecoration: 'none'}}  to={`tel:${product.whatsapp}`}>
            <span className='user_profile_mobile_con_right_child_2_icon_whatsapp' >
              <WhatsAppIcon />
            </span>
            </Link>
          </div>
          <div className='user_profile_mobile_details_child_3' >
            <span className='user_profile_mobile_details_child_3_title' >About Me</span>
            <p>{product.about}</p>

          </div>
        </div>

      </div>
    </div>
  );
}
export default ProductScreen;
