import React from 'react';
import './main.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../../Config/firebase';
import seclogo from './seclogo.png';

const Signup = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signbtn = async () => {
    try {
      await register({ fullname, email, password });
      navigate('/login');
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className='img-div'>
          <img className='loginimg' src={seclogo} alt="" srcset="" />
        </div>
        <div className="inputs">
          <input
            className="login-input"
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
          <input
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="button-group">
          <button className="login-button" onClick={signbtn}>
            Sign up
          </button>
        </div>
        <div className="signup-link">
          <h6>Have an account? </h6>
          <span onClick={() => navigate('/login')}>Log in</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
