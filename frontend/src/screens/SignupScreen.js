import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import '../Register.css'

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        slug,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate( '/createdatingprofile');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className='register' >
    <div className='register_desktop' >
  
      <form onSubmit={submitHandler} className='register_desktop_form' >
        <div className='register_desktop_form_top' >
        <Link to='/'>
          <img src='/logo.png' alt='' className='register_desktop_form_top_logo' />
          </Link>
        </div>
        <div className='register_desktop_form_center' >
        <div className='register_desktop_form_center_input_con' >
            <span className='register_desktop_form_center_input_label' >Name</span>
            <input  onChange={(e) => setName(e.target.value)} required  type='text' placeholder='Enter your Name' className='register_desktop_form_center_input' />
          </div>
          <div className='register_desktop_form_center_input_con' >
            <span className='register_desktop_form_center_input_label' >Username</span>
            <input  onChange={(e) => setSlug(e.target.value)} required  type='text' placeholder='Enter your @username' className='register_desktop_form_center_input' />
          </div>
          <div className='register_desktop_form_center_input_con' >
            <span className='register_desktop_form_center_input_label' >Email</span>
            <input  onChange={(e) => setEmail(e.target.value)} required  type='text' placeholder='Enter your Email' className='register_desktop_form_center_input' />
          </div>
          <div className='register_desktop_form_center_input_con' >
            <span className='register_desktop_form_center_input_label' >Password</span>
            <input  onChange={(e) => setPassword(e.target.value)} required  type='password' placeholder='Enter your Password' className='register_desktop_form_center_input' />
          </div>
          <div className='register_desktop_form_center_input_con' >
            <span className='register_desktop_form_center_input_label' >Confirm Password</span>
            <input  onChange={(e) => setConfirmPassword(e.target.value)} required  type='password' placeholder='Confirm Password' className='register_desktop_form_center_input' />
          </div>
         
          <div className='register_desktop_form_center_btn_con' >
            <button type='submit' className='register_desktop_form_center_btn' >Register</button>
          </div>
        </div>

        <div className='register_desktop_form_bottom' >
          <span className='register_desktop_form_bottom_link_text' >Already have an account?</span>
          <Link to='/signin' style={{textDecoration:"none"}} >
            <span className='register_desktop_form_bottom_link_register' >Login</span>
          </Link>
        </div>

      </form>
    </div>
    <div className='register_mobile' >
    
      <form onSubmit={submitHandler} className='register_mobile_form' >
      <div className='register_mobile_form_top' >
      <Link to='/'>
          <img src='/logo.png' alt='' className='register_mobile_form_top_logo' />
          </Link>
        </div>
        <div className='register_mobile_form_center' >
        <div className='register_mobile_form_center_input_con' >
            <span className='register_mobile_form_center_input_label' >Name</span>
            <input  onChange={(e) => setName(e.target.value)} required  type='text' placeholder='Enter your Email' className='register_mobile_form_center_input' />
          </div>
          <div className='register_mobile_form_center_input_con' >
            <span className='register_mobile_form_center_input_label' >username</span>
            <input  onChange={(e) => setSlug(e.target.value)} required  type='text' placeholder='Enter your @username' className='register_mobile_form_center_input' />
          </div>
          <div className='register_mobile_form_center_input_con' >
            <span className='register_mobile_form_center_input_label' >Email</span>
            <input  onChange={(e) => setEmail(e.target.value)} required  type='text' placeholder='Enter your Email' className='register_mobile_form_center_input' />
          </div>
          <div className='register_mobile_form_center_input_con' >
            <span className='register_mobile_form_center_input_label' >Password</span>
            <input  onChange={(e) => setPassword(e.target.value)} required  type='password' placeholder='Enter your Password' className='register_mobile_form_center_input' />
          </div>
          <div className='register_mobile_form_center_input_con' >
            <span className='register_mobile_form_center_input_label' >Confirm Password</span>
            <input  onChange={(e) => setConfirmPassword(e.target.value)} required  type='password' placeholder='Confirm Password' className='register_mobile_form_center_input' />
          </div>
         
          <div className='register_mobile_form_center_btn_con' >
            <button type='submit' className='register_mobile_form_center_btn' >Login</button>
          </div>
        </div>

        <div className='register_mobile_form_bottom' >
          <span className='register_mobile_form_bottom_link_text' >Already have an account?</span>
          <Link to='/signin' style={{textDecoration:"none"}} >
            <span className='register_mobile_form_bottom_link_register' >Login</span>
          </Link>
        </div>

      </form>
    </div>
  </div>
  );
}
