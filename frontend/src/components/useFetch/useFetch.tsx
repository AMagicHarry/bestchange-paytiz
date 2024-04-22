import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

type UseFetchOptions = {
  apiCall: () => Promise<AxiosResponse>;  
  dependencies?: React.DependencyList; 
};

function useFetch<T = unknown>({ apiCall, dependencies = [] }: UseFetchOptions) {
  const [data, setData] = useState<T | null>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {
    let isMounted = true; 

    const fetchData = async () => {
      setLoading(true);
      setError(null); 
      try {
        const response = await apiCall();
        if (isMounted) {
          setData(response.data); 
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.response?.data); 
        }
      } finally {
        if (isMounted) {
          setLoading(false); 
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, dependencies); 

  return { data, loading, error };
}

export default useFetch;
