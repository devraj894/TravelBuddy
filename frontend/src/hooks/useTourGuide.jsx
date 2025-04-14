import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTourGuide = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: isTourGuide, isPending: isGuideLoading} = useQuery({
        queryKey: [user?.email, 'isTourGuide'],
        queryFn: async () => {
            if (!user?.email) return false;
            const res = await axiosSecure.get(`/users/tour-guide/${user.email}`);
            console.log(res.data);
            return res.data?.tourGuide;
        }
    })
    return [isTourGuide, isGuideLoading]
};
export default useTourGuide;