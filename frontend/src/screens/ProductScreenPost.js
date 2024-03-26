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
    case 'REFRESH_POST':
      return { ...state, post: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };

      case 'CREATE_REQUEST':
      return { ...state, loadingCreateLike: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateLike: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateLike: false };

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

function ProductScreenPost() {
  let reviewsRef = useRef();
  let likesRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, post,loadingCreateLike , loadingCreateReview }, dispatch] =
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
    
    try {
      const { data } = await axios.post(
        `/api/posts/${post._id}/likes`,
        {  
          name: userInfo.name,
          age: userInfo.age,
          image: userInfo.image,
          city: userInfo.city,
          country: userInfo.country,
          category: userInfo.category,
          instagram: userInfo.instagram,
          phone: userInfo.phone,
          whatsapp: userInfo.whatsapp,
        
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Review submitted successfully');
      post.likes.unshift(data.like);
      post.numLikes = data.numLikes;
     
      dispatch({ type: 'REFRESH_POST', payload: post });
      window.scrollTo({
        behavior: 'smooth',
        top: likesRef.current.offsetTop,
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
        <title>{post.name}</title>
      </Helmet>
      <div className='user_profile_desktop' >
        <div className='user_profile_desktop_con' >
          <div className='user_profile_desktop_con_left' >
            <div className='user_profile_desktop_con_left_con' >
              <div className='user_profile_desktop_con_left_top_nav_arrow' >
                <Link to="/" style={{ textDecoration: 'none' }} >
                  <div className='user_profile_desktop_con_left_top_nav_left_arrow' >
                    <ArrowBackIcon />
                  </div>
                </Link>
              </div>
              <img src={post.image} alt={post.name} className='user_profile_desktop_con_left_img' />
            </div>
          </div>
          <div className='user_profile_desktop_con_right' >
            <div className='user_profile_desktop_con_right_con' >
              <div className='user_profile_desktop_con_right_child_1' >
                <div className='user_profile_desktop_con_right_child_1_top' >
                  <span className='user_profile_desktop_con_right_child_1_top_name' >{post.name},</span>
                  <span className='user_profile_desktop_con_right_child_1_top_age' >{post.age}</span>
                  <span className='user_profile_desktop_con_right_child_1_top_verified' ><VerifiedIcon /></span>
                </div>
                <div className='user_profile_desktop_con_right_child_1_bottom' >
                  <span className='user_profile_desktop_con_right_child_1_bottom_location_icon' >
                    <PlaceIcon />
                  </span>
                  <span className='user_profile_desktop_con_right_child_1_bottom_location_city' >{post.country}</span>,
                  <span className='user_profile_desktop_con_right_child_1_bottom_location_city' >{post.city}</span>
                </div>
              </div>
              <div className='user_profile_desktop_con_right_user_info' >
                  <div className='user_profile_desktop_con_right_user_info_con' >
                    <span className='user_profile_desktop_con_right_user_info_con_left' >
                    <LocationCityIcon />
                    </span>
                    <span className='user_profile_desktop_con_right_user_info_con_right' >{post.city}</span>
                  </div>
                  <div className='user_profile_desktop_con_right_user_info_con' >
                    <span className='user_profile_desktop_con_right_user_info_con_left' >
                    <SchoolIcon />
                    </span>
                    <span className='user_profile_desktop_con_right_user_info_con_right' >{post.school}</span>
                  </div>
                  <div className='user_profile_desktop_con_right_user_info_con' >
                    <span className='user_profile_desktop_con_right_user_info_con_left' >
                    <FavoriteIcon />
                    </span>
                    <span className='user_profile_desktop_con_right_user_info_con_right' >{post.category}</span>
                  </div>
              </div>
              <div className='user_profile_desktop_con_right_child_2' >
              <Link style={{textDecoration: 'none'}}  to={`${post.instagram}`}>
            <span className='user_profile_desktop_con_right_child_2_icon_instagram' >
              <InstagramIcon />
            </span>
            </Link>
            <Link style={{textDecoration: 'none'}}  to={`tel:${post.phone}`}>
            <span className='user_profile_desktop_con_right_child_2_icon_phone' >
              <PhoneIcon />
            </span>
            </Link>
            <Link style={{textDecoration: 'none'}}  to={`tel:${post.whatsapp}`}>
            <span className='user_profile_desktop_con_right_child_2_icon_whatsapp' >
              <WhatsAppIcon />
            </span>
            </Link>
          
           
            
              </div>
              <div className='user_profile_desktop_con_right_child_3' >
                <span className='user_profile_desktop_con_right_child_3_title' >About Me</span>
                <p>{post.about}</p>

              </div>
            </div>

          </div>
        </div>

      </div>
      <div className='user_profile_mobile' >
        <div className='user_profile_mobile_img_con' >
          <div className='user_profile_mobile_img_con_top_arrow' >
            <Link style={{textDecoration: 'none'}}  to='/'>
            <span className='user_profile_mobile_img_con_top_btn_arrow' >
              <ArrowBackIcon />
            </span>
            </Link>
          </div>
          <img src={post.image} className='user_profile_mobile_img' alt='' />
        </div>
        <div className='user_profile_mobile_details' >
          <div className='user_profile_mobile_details_child_1' >
            <div className='user_profile_mobile_details_child_1_top' >
              <span className='user_profile_mobile_details_child_1_top_name' >{post.name},</span>
              <span className='user_profile_mobile_details_child_1_top_age' >{post.age}</span>
              <span className='user_profile_mobile_details_child_1_top_verified' ><VerifiedIcon /></span>
            </div>
            <div className='user_profile_mobile_details_child_1_bottom' >
              <span className='user_profile_mobile_details_child_1_bottom_location_icon' >
                <PlaceIcon />
              </span>
              <span className='user_profile_mobile_details_child_1_bottom_location_city' >{post.country},</span>
              <span className='user_profile_mobile_details_child_1_bottom_location_city' >{post.city}</span>
            </div>
          </div>
          <div className='user_profile_mobile_con_right_user_info' >
                  <div className='user_profile_mobile_con_right_user_info_con' >
                    <span className='user_profile_mobile_con_right_user_info_con_left' >
                    <LocationCityIcon />
                    </span>
                    <span className='user_profile_mobile_con_right_user_info_con_right' >{post.city}</span>
                  </div>
                  <div className='user_profile_mobile_con_right_user_info_con' >
                    <span className='user_profile_mobile_con_right_user_info_con_left' >
                    <SchoolIcon />
                    </span>
                    <span className='user_profile_mobile_con_right_user_info_con_right' >{post.school}</span>
                  </div>
                  <div className='user_profile_mobile_con_right_user_info_con' >
                    <span className='user_profile_mobile_con_right_user_info_con_left' >
                    <FavoriteIcon />
                    </span>
                    <span className='user_profile_mobile_con_right_user_info_con_right' >{post.category}</span>
                  </div>
              </div>
          <div className='user_profile_mobile_details_child_2' >
              <Link style={{textDecoration: 'none'}}  to={`${post.instagram}`}>
            <span className='user_profile_mobile_con_right_child_2_icon_instagram' >
              <InstagramIcon />
            </span>
            </Link>
            <Link style={{textDecoration: 'none'}}  to={`tel:${post.phone}`}>
            <span className='user_profile_mobile_con_right_child_2_icon_phone' >
              <PhoneIcon />
            </span>
            </Link>
            <Link style={{textDecoration: 'none'}}  to={`tel:${post.whatsapp}`}>
            <span className='user_profile_mobile_con_right_child_2_icon_whatsapp' >
              <WhatsAppIcon />
            </span>
            </Link>
            
          </div>
          <div className='user_profile_mobile_details_child_3' >
            <span className='user_profile_mobile_details_child_3_title' >About Me</span>
            <p>{post.about}</p>

          </div>
        </div>

      </div>
    </div>
  );
}
export default ProductScreenPost;
