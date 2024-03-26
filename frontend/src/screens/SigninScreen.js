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
import '../Login.css'

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
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
    <div className='login' > 
    <div className='login_desktop' >
     
      <form onSubmit={submitHandler} className='login_desktop_form' >
        <div className='login_desktop_form_top' >
        <Link to='/'>
          <img src='/logo.png' alt='' className='login_desktop_form_top_logo' />
          </Link>
        </div>
        <div className='login_desktop_form_center' >
          <div className='login_desktop_form_center_input_con' >
            <span className='login_desktop_form_center_input_label' >Email</span>
            <input required  onChange={(e) => setEmail(e.target.value)}  type='text' placeholder='Enter your Email' className='login_desktop_form_center_input' />
          </div>
          <div className='login_desktop_form_center_input_con' >
            <span className='login_desktop_form_center_input_label' >Password</span>
            <input required  onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter your Password' className='login_desktop_form_center_input' />
          </div>
          <div className='login_desktop_form_center_password_con' >
            <Link to='/'>
              <span className='login_desktop_form_center_password_link' >Forgot Password</span>
             </Link>
          </div>
          <div className='login_desktop_form_center_btn_con' >
            <button type='submit' className='login_desktop_form_center_btn' >Login</button>
          </div>
        </div>

        <div className='login_desktop_form_bottom' >
          <span className='login_desktop_form_bottom_link_text' >Don't have an account?</span>
          <Link to='/signup'style={{textDecoration:"none"}} >
            <span className='login_desktop_form_bottom_link_register' >Register</span>
          </Link>
        </div>

      </form>
    </div>
    <div className='login_mobile' >
     
      <form onSubmit={submitHandler} className='login_mobile_form' >
      <div className='login_mobile_form_top' >
        <Link to='/'>
          <img src='/logo.png' alt='' className='login_mobile_form_top_logo' />
          </Link>
        </div>
        <div className='login_mobile_form_center' >
          <div className='login_mobile_form_center_input_con' >
            <span className='login_mobile_form_center_input_label' >Email</span>
            <input required  onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Enter your Email' className='login_mobile_form_center_input' />
          </div>
          <div className='login_mobile_form_center_input_con' >
            <span className='login_mobile_form_center_input_label' >Password</span>
            <input required  onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter your Password' className='login_mobile_form_center_input' />
          </div>
          <div className='login_mobile_form_center_password_con' >
            <Link to='/'>
              <span className='login_mobile_form_center_password_link' >Forgot Password</span>
            </Link>
          </div>
          <div className='login_mobile_form_center_btn_con' >
            <button type='submit' className='login_mobile_form_center_btn' >Login</button>
          </div>
        </div>

        <div className='login_mobile_form_bottom' >
          <span className='login_mobile_form_bottom_link_text' >Don't have an account?</span>
          <Link to='/signup'style={{textDecoration:"none"}} >
            <span className='login_mobile_form_bottom_link_register' >Register</span>
          </Link>
        </div>
      </form>
    </div>
  </div>
  );
}
