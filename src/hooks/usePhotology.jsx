

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./axiosSecure";
import UseAuth from "./UseAuth";


const usePathology = () => {
    const { user, loading } = UseAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: isPathology, isLoading: isPathologyLoading } = useQuery({
        queryKey: ['isPathology', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/pathology/${user?.email}`);
            return res.data.phermacy;
        }
    })
   
    return [isPathology, isPathologyLoading]

}
export default usePathology;