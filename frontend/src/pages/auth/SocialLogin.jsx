import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = () => {
        googleSignIn()
        .then(result => {
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then((res) => {
                console.log(res.data);
                navigate(from, {replace: true});
            })           
        })
        .catch(error => {
            console.log('error during google login', error);
        })
    }

    return (
        <div>
            <div className='divider'>OR</div>
            <div className="form-control mt-4">
                <button onClick={handleGoogleLogin} className="btn border-sky-800 bg-white text-sky-800 text-lg mb-3">Login with Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;
