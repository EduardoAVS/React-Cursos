import { RootState } from "../store";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAuth = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    const [auth, setAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if(user){
            setAuth(true);
        }
        else{
            setAuth(false);
        }

        setLoading(false);
    }, [user]);

    return { auth, loading };
}