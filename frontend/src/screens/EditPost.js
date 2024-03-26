import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox'; 
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';

import '../Preview.css' 

//icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import InfoIcon from '@mui/icons-material/Info';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
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
function EditPost({ match }) {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: postId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/posts/${postId}`);
        setName(data.name);
        setInstagram(data.instagram);
        setPhone(data.phone);
        setWhatsapp(data.whatsapp);
        setAbout(data.about);
        setBirth(data.birth);
        setSchool(data.school);
        setImage(data.image);
        setCountry(data.country);
        setCity(data.city);
        setBody(data.body);
        setGenderpref(data.genderpref);
        setGender(data.gender);
        setCategory(data.category);
        setAge(data.age);
        
       
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [postId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/posts/${postId}`,
        {
          _id: postId,
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
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Dating Profile  updated successfully');
      navigate('/');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };


  
  return (
    <div className='create_profile'>
      <Helmet>
        <title>{postId}</title>
      </Helmet>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
      <form onSubmit={submitHandler} className='create_profile_form'>
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
        )}
    </div>
  );
}

export default EditPost;
