import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import SocialLogin from './SocialLogin';

const Login = () => {

    const {loginUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
        .then(result => {
            const user = result.user;
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Login Successful!",
                showConfirmButton: false,
                timer: 1500
              });
              navigate(from, {replace: true});
        })
        .catch(error => {
            console.log('error in login', error.message);
        })
        
    }

    return (
        <div className="min-h-screen mt-10 flex flex-col md:flex-row items-center justify-center gap-7 p-5">
            <div className='w-1/2'>
                <img src="https://i.ibb.co.com/PWpDxk6/Tablet-login-rafiki.png" alt="" />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
                <div className="card shrink-0 shadow-2xl">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mt-4">Login now!</h1>
                    </div>
                    <form onSubmit={handleLogin} className="px-5 pb-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email' className="input input-bordered text-white" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered text-white" required />
                        </div>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        
                        <div className="form-control mt-4">
                            <button className="btn bg-sky-900 hover:bg-sky-950 text-white text-xl mb-3">Login</button>
                        </div>

                       <SocialLogin></SocialLogin>
                        <p className='text-center border border-gray-500 py-2 rounded-3xl'>New to this website? Please <Link to='/register' className='underline text-blue-600'>Register</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;