import React, { useContext, useReducer, useState } from 'react';
import axios from 'axios';
import '../Post.css';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';  
import Form from 'react-bootstrap/Form';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
 
import '../Preview.css'

//icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import InfoIcon from '@mui/icons-material/Info';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};



const Post = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const [{ loadingUpdate, loadingUpload }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  
  const {  userInfo } = state;

  const [slug, setSlug] = useState(userInfo._id);
  const [name, setName] = useState(userInfo.name);
  const [instagram, setInstagram] = useState(userInfo.instagram);
  const [phone, setPhone] = useState(userInfo.phone);
  const [whatsapp, setWhatsapp] = useState(userInfo.whatsapp);
  const [about, setAbout] = useState(userInfo.about);
  const [birth, setBirth] = useState(userInfo.birth);
  const [school, setSchool] = useState(userInfo.school);
  const [image, setImage] = useState(userInfo.image);
  const [country, setCountry] = useState(userInfo.country);
  const [city, setCity] = useState(userInfo.city);
  const [body, setBody] = useState(userInfo.body);
  const [genderpref, setGenderpref] = useState(userInfo.genderpref);
  const [gender, setGender] = useState(userInfo.gender);
  const [category, setCategory] = useState(userInfo.category);
  const [email, setEmail] = useState(userInfo.email);
  const [age, setAge] = useState(userInfo.age);

  const [postData, setPostData] = useState({
    name,
    slug,
    image,
    images: [], 
    category,
    gender,
    genderpref,
    body,
    country,
    school,
    birth,
    about,
    whatsapp,
    phone,
    instagram,
    age,
    city,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/posts', postData);
      console.log('Post created:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${state.userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setPostData({ ...postData, images: [...postData.images, data.secure_url] });
      } else {
        setPostData({ ...postData, image: data.secure_url });
      }
      toast.success('Image uploaded successfully. Click Update to apply it');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  const deleteFileHandler = (fileName) => {
    const filteredImages = postData.images.filter((x) => x !== fileName);
    setPostData({ ...postData, images: filteredImages });
    toast.success('Image removed successfully. Click Update to apply it');
  };

  return (
    <div className='create_profile'>
      <Helmet>
        <title>Create Dating Profile</title>
      </Helmet>
     
      <form onSubmit={handleSubmit} className='create_profile_form'>
        <spn className='create_profile_form_title' >Profile  Priview</spn>
      <div className='Home_desktop_user_card_con' >
      <div className='Home_desktop_user_card' >
    <span className='Home_desktop_user_card_top' >{category}</span>
    <img src={image} alt='' className='Home_desktop_user_card_img' />
    <div className='Home_desktop_user_card_details' >
        <div className='Home_desktop_user_card_details_left' >
            <div className='Home_desktop_user_card_details_left_top' >
                
                <span className='Home_desktop_user_card_details_left_top_name' >@{name},</span>
                <span className='Home_desktop_user_card_details_left_top_age' >{age}</span>
              
            </div>
            <div className='Home_desktop_user_card_details_left_location_con' >
                <span className='Home_desktop_user_card_details_left_location_con_left' ><PlaceIcon fontSize="small" /></span>
                <span className='Home_desktop_user_card_details_left_location_con_right' >{country},{city}</span>
            </div>
        </div>
        <div className='Home_desktop_user_card_details_right' >
        
            <span className='Home_desktop_user_card_details_right_btn' ><InfoIcon fontSize="large" /></span>
       
        </div>
    </div>
    </div>
</div>
<button className='create_profile_form_btn'  >Create Profile</button>
      </form>
     
    </div>
  );
};

export default Post;
