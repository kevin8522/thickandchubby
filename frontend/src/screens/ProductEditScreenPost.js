import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams,Link } from 'react-router-dom';
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
import MobileHeader from '../components/MobileHeader';
import Button from 'react-bootstrap/Button';
import '../EditProfile.css'

import DesktopHeader from '../components/DesktopHeader'; 
import '../Preview.css' 

//icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import InfoIcon from '@mui/icons-material/Info';


//icons
import PersonIcon from '@mui/icons-material/Person';

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
export default function ProductEditScreenPost() {
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
 
    const [image, setImage] = useState('');
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [instagram, setInstagram] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [about, setAbout] = useState('');
    const [birth, setBirth] = useState('');
    const [school, setSchool] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [body, setBody] = useState('');
    const [genderpref, setGenderpref] = useState('');
    const [gender, setGender] = useState('');
    const [category, setCategory] = useState('');
 
    const [age, setAge] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/posts/${postId}`);
        setGender(data.gender);
        setGenderpref(data.genderpref);
        setBody(data.body);
        setCountry(data.country);
        setSchool(data.school);
        setBirth(data.birth);
        setAbout(data.about);
        setWhatsapp(data.whatsapp);
        setPhone(data.phone);
        setInstagram(data.instagram);
        setAge(data.age);
        setCity(data.city);
        setName(data.name);
 
        setImage(data.image);
        setImages(data.images);
        setCategory(data.category);
     
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
          name,
          age,
          city,
       
          image,
          images,
          category,
       
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Post updated successfully');
      navigate('/');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
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
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success('Image uploaded successfully. click Update to apply it');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    toast.success('Image removed successfully. click Update to apply it');
  };
  
  return (
    <div className='edit_profile' >
      <Helmet>
        <title>{postId}</title>
      </Helmet>
  

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (

       <>

     
    <div className='edit_profile_desktop' >
<DesktopHeader />
      <div className='edit_profile_desktop_form_con' >
        <form onSubmit={submitHandler} className='edit_profile_desktop_form' >
          <div className='edit_profile_desktop_form_top' >

            <span className='edit_profile_desktop_form_top_left' >
              <PersonIcon />
            </span>
            <span className='edit_profile_desktop_form_top_right' >Edit Profile</span>
          </div>
          <div className='edit_profile_desktop_form_center' >
            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Update your name' className='edit_profile_desktop_form_center_input' />
            </div>
            
            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >City</span>
              <input value={city} onChange={(e) => setCity(e.target.value)} type='text' placeholder='Update your City' className='edit_profile_desktop_form_center_input' />
            </div>
            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >Looking for</span>
              <select className='edit_profile_desktop_form_center_input' value={category} onChange={(e) => setCategory(e.target.value)} >
              <option value="">Looking for</option>
                <option value="onenight">onenight</option>
                <option value="relationship">relationship</option>
                <option value="friend">friend</option>
              </select>
            </div>
            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >Gender</span>
              <select className='edit_profile_desktop_form_center_input' value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >Gender Pref</span>
              <select className='edit_profile_desktop_form_center_input' value={genderpref} onChange={(e) => setGenderpref(e.target.value)}>
              <option value="">Select Gender Pref</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >My Body Type</span>

              <select className='edit_profile_desktop_form_center_input' value={body} onChange={(e) => setBody(e.target.value)}>
              <option value="">Select Body Type</option>
                <option value="thick">thick</option>
                <option value="chubby">chubby</option>
                <option value="curvy">curvy</option>
                <option value="medium">medium</option>
                <option value="petite">petite</option>
              </select>
            </div>
            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >country</span>

              <select className='edit_profile_desktop_form_center_input' value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Select a country</option>
                <option value="Algeria">Algeria</option>
                <option value="Angola">Angola</option>
                <option value="Benin">Benin</option>
                <option value="Botswana">Botswana</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cabo Verde">Cabo Verde</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Comoros">Comoros</option>
                <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Egypt">Egypt</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Eswatini">Eswatini</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Ghana">Ghana</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-Bissau">Guinea-Bissau</option>
                <option value="Ivory Coast">Ivory Coast</option>
                <option value="Kenya">Kenya</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Mali">Mali</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Namibia">Namibia</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Senegal">Senegal</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Sudan">South Sudan</option>
                <option value="Sudan">Sudan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Togo">Togo</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Uganda">Uganda</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
                <option value="usa">United States of America</option>
                <option value="Canada">Canada</option>
                <option value="Uk">United kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Armenia">Armenia</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Brunei">Brunei</option>
                <option value="Cambodia">Cambodia</option>
                <option value="China">China</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Georgia">Georgia</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Israel">Israel</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Laos">Laos</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Nepal">Nepal</option>
                <option value="North Korea">North Korea</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palestine">Palestine</option>
                <option value="Philippines">Philippines</option>
                <option value="Qatar">Qatar</option>
                <option value="Russia">Russia</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Singapore">Singapore</option>
                <option value="South Korea">South Korea</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Syria">Syria</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-Leste">Timor-Leste</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Yemen">Yemen</option>

                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Barbados">Barbados</option>
                <option value="Cuba">Cuba</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Grenada">Grenada</option>
                <option value="Haiti">Haiti</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Argentina">Argentina</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Brazil">Brazil</option>
                <option value="Chile">Chile</option>
                <option value="Colombia">Colombia</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Guyana">Guyana</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Suriname">Suriname</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Venezuela">Venezuela</option>
              </select>
            </div>
            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >School</span>
              <input value={school} onChange={(e) => setSchool(e.target.value)} type='text' placeholder='Update your School' className='edit_profile_desktop_form_center_input' />
            </div>
            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >Birth Year</span>
              <select className='edit_profile_desktop_form_center_input' value={birth} onChange={(e) => setBirth(e.target.value)}>
                <option value="">Select Birth Year</option>
                <option value="1970">1970</option>
                <option value="1971">1971</option>
                <option value="1972">1972</option>
                <option value="1973">1973</option>
                <option value="1974">1974</option>
                <option value="1975">1975</option>
                <option value="1976">1976</option>
                <option value="1977">1977</option>
                <option value="1978">1978</option>
                <option value="1979">1979</option>
                <option value="1980">1980</option>
                <option value="1981">1981</option>
                <option value="1982">1982</option>
                <option value="1983">1983</option>
                <option value="1984">1984</option>
                <option value="1985">1985</option>
                <option value="1986">1986</option>
                <option value="1987">1987</option>
                <option value="1988">1988</option>
                <option value="1989">1989</option>
                <option value="1990">1990</option>
                <option value="1991">1991</option>
                <option value="1992">1992</option>
                <option value="1993">1993</option>
                <option value="1994">1994</option>
                <option value="1995">1995</option>
                <option value="1996">1996</option>
                <option value="1997">1997</option>
                <option value="1998">1998</option>
                <option value="1999">1999</option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
              </select>
            </div>

            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >Age</span>
              <input value={age} onChange={(e) => setAge(e.target.value)} type='text' placeholder='Update your Age' className='edit_profile_desktop_form_center_input' />
            </div>
           
            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >Whatsapp</span>
              <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} type='text' placeholder='Update your Whatsapp' className='edit_profile_desktop_form_center_input' />
            </div>
            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >Phone</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type='text' placeholder='Update your PnoneNumber' className='edit_profile_desktop_form_center_input' />
            </div>
            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >Instagram</span>
              <input value={instagram} onChange={(e) => setInstagram(e.target.value)} type='text' placeholder='Update your Instagram Link' className='edit_profile_desktop_form_center_input' />
            </div>
         

            <div className='edit_profile_desktop_form_center_input_con' >
              <span className='edit_profile_desktop_form_center_input_label' >About</span>
              <textarea maxlength="100" value={about} onChange={(e) => setAbout(e.target.value)} type='text' placeholder='Tell us something about you' className='edit_profile_desktop_form_center_input' />
            </div>


            <div className='edit_profile_desktop_form_center_btn_con' >
              <button disabled={loadingUpdate} type='submit' className='edit_profile_desktop_form_center_btn' >Update Profile</button>
              {loadingUpdate && <LoadingBox></LoadingBox>}
            </div>
          </div>



        </form>
      </div>
    </div>
    <div className='edit_profile_mobile' >
<MobileHeader/>
   
      <div className='edit_profile_mobile_form_con' >
        <form onSubmit={submitHandler} className='edit_profile_mobile_form' >
          <div className='edit_profile_mobile_form_top' >

            <span className='edit_profile_mobile_form_top_left' >
              <PersonIcon />
            </span>
            <span className='edit_profile_mobile_form_top_right' >Edit Profile</span>
          </div>
          <div className='edit_profile_mobile_form_center' >
          <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Update your name' className='edit_profile_mobile_form_center_input' />
            </div>
           
            <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >City</span>
              <input value={city} onChange={(e) => setCity(e.target.value)} type='text' placeholder='Update your City' className='edit_profile_mobile_form_center_input' />
            </div>
            <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >Looking for</span>
              <select className='edit_profile_mobile_form_center_input' value={category} onChange={(e) => setCategory(e.target.value)} >
              <option value="">Looking for</option>
                <option value="onenight">onenight</option>
                <option value="relationship">relationship</option>
                <option value="friend">friend</option>
              </select>
            </div>
            <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >Gender</span>
              <select className='edit_profile_mobile_form_center_input' value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >Gender Pref</span>
              <select className='edit_profile_mobile_form_center_input' value={genderpref} onChange={(e) => setGenderpref(e.target.value)}>
              <option value="">Select Gender Pref</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >My Body Type</span>

              <select className='edit_profile_mobile_form_center_input' value={body} onChange={(e) => setBody(e.target.value)}>
              <option value="">Select Body Type</option>
                <option value="thick">thick</option>
                <option value="chubby">chubby</option>
                <option value="curvy">curvy</option>
                <option value="medium">medium</option>
                <option value="petite">petite</option>
              </select>
            </div>
            <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >country</span>

              <select className='edit_profile_mobile_form_center_input' value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Select a country</option>
                <option value="Algeria">Algeria</option>
                <option value="Angola">Angola</option>
                <option value="Benin">Benin</option>
                <option value="Botswana">Botswana</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cabo Verde">Cabo Verde</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Comoros">Comoros</option>
                <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Egypt">Egypt</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Eswatini">Eswatini</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Ghana">Ghana</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-Bissau">Guinea-Bissau</option>
                <option value="Ivory Coast">Ivory Coast</option>
                <option value="Kenya">Kenya</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malawi">Malawi</option>
                <option value="Mali">Mali</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Namibia">Namibia</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                <option value="Senegal">Senegal</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="South Sudan">South Sudan</option>
                <option value="Sudan">Sudan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Togo">Togo</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Uganda">Uganda</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
                <option value="usa">United States of America</option>
                <option value="Canada">Canada</option>
                <option value="Uk">United kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Afghanistan">Afghanistan</option>
                <option value="Armenia">Armenia</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Brunei">Brunei</option>
                <option value="Cambodia">Cambodia</option>
                <option value="China">China</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Georgia">Georgia</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Israel">Israel</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Laos">Laos</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Maldives">Maldives</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Nepal">Nepal</option>
                <option value="North Korea">North Korea</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palestine">Palestine</option>
                <option value="Philippines">Philippines</option>
                <option value="Qatar">Qatar</option>
                <option value="Russia">Russia</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Singapore">Singapore</option>
                <option value="South Korea">South Korea</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Syria">Syria</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Thailand">Thailand</option>
                <option value="Timor-Leste">Timor-Leste</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Yemen">Yemen</option>

                <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Barbados">Barbados</option>
                <option value="Cuba">Cuba</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Grenada">Grenada</option>
                <option value="Haiti">Haiti</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                <option value="Saint Lucia">Saint Lucia</option>
                <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                <option value="Argentina">Argentina</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Brazil">Brazil</option>
                <option value="Chile">Chile</option>
                <option value="Colombia">Colombia</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Guyana">Guyana</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Suriname">Suriname</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Venezuela">Venezuela</option>
              </select>
            </div>
            <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >School</span>
              <input value={school} onChange={(e) => setSchool(e.target.value)} type='text' placeholder='Update your School' className='edit_profile_mobile_form_center_input' />
            </div>
            <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >Birth Year</span>
              <select className='edit_profile_mobile_form_center_input' value={birth} onChange={(e) => setBirth(e.target.value)}>
                <option value="">Select Birth Year</option>
                <option value="1970">1970</option>
                <option value="1971">1971</option>
                <option value="1972">1972</option>
                <option value="1973">1973</option>
                <option value="1974">1974</option>
                <option value="1975">1975</option>
                <option value="1976">1976</option>
                <option value="1977">1977</option>
                <option value="1978">1978</option>
                <option value="1979">1979</option>
                <option value="1980">1980</option>
                <option value="1981">1981</option>
                <option value="1982">1982</option>
                <option value="1983">1983</option>
                <option value="1984">1984</option>
                <option value="1985">1985</option>
                <option value="1986">1986</option>
                <option value="1987">1987</option>
                <option value="1988">1988</option>
                <option value="1989">1989</option>
                <option value="1990">1990</option>
                <option value="1991">1991</option>
                <option value="1992">1992</option>
                <option value="1993">1993</option>
                <option value="1994">1994</option>
                <option value="1995">1995</option>
                <option value="1996">1996</option>
                <option value="1997">1997</option>
                <option value="1998">1998</option>
                <option value="1999">1999</option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
              </select>
            </div>

            <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >Age</span>
              <input value={age} onChange={(e) => setAge(e.target.value)} type='text' placeholder='Update your Age' className='edit_profile_mobile_form_center_input' />
            </div>
           
            <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >Whatsapp</span>
              <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} type='text' placeholder='Update your Whatsapp' className='edit_profile_mobile_form_center_input' />
            </div>
            <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >Phone</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type='text' placeholder='Update your PnoneNumber' className='edit_profile_mobile_form_center_input' />
            </div>
            <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >Instagram</span>
              <input value={instagram} onChange={(e) => setInstagram(e.target.value)} type='text' placeholder='Update your Instagram Link' className='edit_profile_mobile_form_center_input' />
            </div>
         

            <div className='edit_profile_mobile_form_center_input_con' >
              <span className='edit_profile_mobile_form_center_input_label' >About</span>
              <textarea maxlength="100" value={about} onChange={(e) => setAbout(e.target.value)} type='text' placeholder='Tell us something about you' className='edit_profile_mobile_form_center_input' />
            </div>



            <div className='edit_profile_mobile_form_center_btn_con' >
              <button disabled={loadingUpdate} type='submit' className='edit_profile_mobile_form_center_btn' >Update Profile</button>
              {loadingUpdate && <LoadingBox></LoadingBox>}
            </div>
          </div>



        </form>
      </div>

    </div>


       </>

      )}
    </div>
  );
}
