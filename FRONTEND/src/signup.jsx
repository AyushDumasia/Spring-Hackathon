import { useState } from 'react';
import './signup.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
export default function SignUp(){
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
                <h1>Sign Up</h1>
                <span className='closure'>Already have an account?
                    &nbsp;
                    <a href='#'>Login!</a>
                </span>
                <div className='inputField'>
                    <div className='div'>
                        <label htmlFor='username' className='label'>Username</label>
                        <input className = 'input' id='username' placeholder='Enter your username' name = 'username' required></input>
                    </div>
                    <div className='div'>
                        <label htmlFor='email' className='label'>Email</label>
                        <input className = 'input' id='' placeholder='Enter your Email' name = 'email' required></input>
                    </div>
                    <div className='div'>
                        <label htmlFor='phone' className='label'>Contact Number</label>
                        <input className = 'input' id='phone' placeholder='Enter your contact number' name = 'phone' type = 'number' required></input>
                    </div>
                    <div className='div'>
                        <label htmlFor='isHosteler' className='label'>Type</label>
                        <select className = 'dropdown' id = 'isHosteler' required>
                            <option value='true'>Hosteler</option>
                            <option value='false'>Day Scholar</option>
                        </select>
                    </div>
                    <div className='div'>
                        <label htmlFor='password' className='label'>Confirm Password</label>
                        <div className='passwordBox'>
                            <input className = 'input' id='password' placeholder='Confirm your password' name = 'password' type = {newType} value={password} onChange={changeVal} required/>
                                {showPassword ? eyeSlash : eye}
                        </div>
                    </div>
                </div>
                <button className='action'>Login</button>
            </form>
        </div>
    );
}