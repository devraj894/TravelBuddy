import axios from 'axios';

const AxiosPublic = axios.create({
    baseURL: 'https://assignment-12-server-beryl.vercel.app',
    
})
const useAxiosPublic = () => {
    return AxiosPublic;
};

export default useAxiosPublic;