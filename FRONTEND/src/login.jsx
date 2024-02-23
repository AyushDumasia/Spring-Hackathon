import { useState } from 'react';
import './login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const changeVal = (event) => {
        setPassword(event.target.value);
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    let newType = showPassword ? 'text' : 'password';
    const eye = <FaEye onClick={toggleShowPassword} className='eye-icon'/>;
    const eyeSlash = <FaEyeSlash onClick={toggleShowPassword} className='eye-icon'/>

    return(
        <div className="formArea">
            <form method='' action=''>
                <h1>Login</h1>
                <span className='closure'>Don't have an account?
                    &nbsp;
                    <a href='#'>Sign up!</a>
                </span>
                <div className='inputField'>
                    <div className='div'>
                        <label htmlFor='username' className='label'>Username</label>
                        <input id='username' placeholder='Enter your username' name = 'username' required></input>
                    </div>
                    <div className='div'>
                        <label htmlFor='password' className='label'>Password</label>
                        <div className='passwordBox'>
                            <input id='password' placeholder='Enter your password' name = 'password'type = {newType} value={password} onChange={changeVal} required/>
                            {/* <div className='eye-icon'> */}
                                {showPassword ? eyeSlash : eye}
                            {/* </div> */}
                        </div>
                    </div>
                    <a href='#' className='closure'>Forgot password? Reset now!</a>
                </div>
                <button className='action'>Login</button>
            </form>
        </div>
    );
}
