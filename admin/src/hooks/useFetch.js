import  axiosInstance  from '../api/axios';
import {useQuery} from '@tanstack/react-query'

const useFetch = (key, url) => {
  return useQuery({
    queryKey: [key,url],
    queryFn : async() => {
       const response = await axiosInstance.get(url);
       return response.data
    },
  });
};

export default useFetch