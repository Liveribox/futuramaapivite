import { useEffect, useState } from 'react';
import { getItems } from '../heplers/getItems';

export const useFetchFuturamas = () => {
 
    const [futuramas, setFuturamas] = useState([]);
    const [isLoading, setIsLoading] = useState( true );

    const getFuturamas = async() => {
        const newFuturamas = await getItems();
        setFuturamas(newFuturamas);
        setIsLoading(false);
    }
    
    useEffect( () => {
        getFuturamas();
    }, []);



    return {
        futuramas,
        setFuturamas,
        isLoading
    }

}
