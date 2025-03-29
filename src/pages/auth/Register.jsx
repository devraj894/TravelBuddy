import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import SocialLogin from './SocialLogin';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const userInfo = {
                            name: data.name, email: data.email, photo: data.photo, role: 'tourist'
                        }
                        console.log(userInfo);
                        axiosPublic.post('/users', userInfo)
                            .then(() => {
                                console.log('user added to the database');
                                reset();
                                Swal.fire({
                                    position: "top-center",
                                    icon: "success",
                                    title: "User created successfully!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/');
                            })
                    })
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to register. Please try again later.',
                });
            })
    }

    return (
        <div className="min-h-screen mt-10 flex flex-col md:flex-row items-center justify-center gap-7 p-5">
            <div className='w-1/2'>
                <img src="https://i.ibb.co.com/j3MRkHW/Mobile-login-rafiki.png" alt="" />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3">
                <div className="card shrink-0 shadow-2xl">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mt-4">Register now!</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="px-5 pb-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register('name', { required: 'Name is required' })} placeholder="name" className="input input-bordered text-white" />
                            {errors.name && <span className='text-red-500'>Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register('email', { required: 'Email is required' })} placeholder="email" className="input input-bordered text-white" />
                            {errors.email && <span className='text-red-600'>Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile Photo </span>
                            </label>
                            <input type="url" {...register('photo', { required: 'Profile photo is required' })} placeholder="photo url" className="input input-bordered text-white" />
                            {errors.photo && <span className='text-red-600'>Photo is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register('password', {
                                required: true,
                                minLength: 6,
                                maxLength: 15,
                                pattern: /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-])/
                            })} placeholder="password" name='password' className="input input-bordered text-white" />
                            {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be less than 15 characters</p>}
                            {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must have one uppercase, one lowercase, one number and one special character</p>}
                        </div>
                        <div className="form-control mt-4">
                            <input className="btn bg-sky-900 hover:bg-sky-950 text-white text-xl mb-3" type="submit" value="Register" />
                        </div>

                        <SocialLogin></SocialLogin>

                        <p className='text-center border border-gray-500 py-2 rounded-3xl'>Already have an account? Please <Link to='/login' className='underline text-blue-600'>Login</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;