

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";
import UseAuth from "./UseAuth";


const useRegister = () => {
    const { user, loading } = UseAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: isRegister, isLoading: isRegisterLoading } = useQuery({
        queryKey: ['isRegister', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/register/${user?.email}`);
            return res.data.register;
        }
    })
   
    return [isRegister, isRegisterLoading]

}
export default useRegister;