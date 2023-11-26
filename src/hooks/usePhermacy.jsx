

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";
import UseAuth from "./UseAuth";


const usePhermacy = () => {
    const { user, loading } = UseAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: isPhermacy, isLoading: isPhermacyLoading } = useQuery({
        queryKey: ['isPhermacy', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/phermacy/${user?.email}`);
            return res.data.phermacy;
        }
    })
   
    return [isPhermacy, isPhermacyLoading]

}
export default usePhermacy;