import {useEffect, useState} from "react"

const useFetch = (url)=>{
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)

  useEffect(()=>{
    const fetchData = async ()=>{
        setLoading(true);
        setError(null); // Reset error on new fetch
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch data");
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
     }
     fetchData();
  },[])
  
  const reFetch = async ()=>{
    setLoading(true);
    setError(null); // Reset error on new fetch
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
    } catch (error) {
        setError(error)
    }finally{
        setLoading(false)
    }
 }
  return { data, loading, error, reFetch };
}

export default useFetch;