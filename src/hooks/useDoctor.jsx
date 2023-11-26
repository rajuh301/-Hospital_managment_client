

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";
import UseAuth from "./UseAuth";


const useDoctor = () => {
    const { user, loading } = UseAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: isDoctor, isLoading: isDoctorLoading } = useQuery({
        queryKey: ['isDoctor', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/doctor/${user?.email}`);
            return res.data.doctor;
        }
    })
   
    return [isDoctor, isDoctorLoading]

}
export default useDoctor;