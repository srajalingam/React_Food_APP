import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error(resData.message || "Request failed!");
    }
    return resData;
}

export default function useHttp(url,config,initialData=null) {
    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState(false);
    const [data,setData]=useState(initialData);
    const sendRequest = useCallback(async () => {
        try {
            setIsLoading(true);
            const resData = await sendHttpRequest(url, config); 
            setData(resData);
        } catch (error) {
            setError(error.message || "Something went wrong!");
        }finally{
            setIsLoading(false);
        }
    },[url,config]);

    useEffect(() => {
        if(config && config.method=="GET"){
            sendRequest();
        }
    },[sendRequest,config]);

    return {
        error,
        isLoading,
        data,
        sendRequest,
    }
}