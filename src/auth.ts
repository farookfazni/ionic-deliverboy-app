import React, { useContext, useState, useEffect } from 'react';
import {auth as firebaseAuth } from './firebase';

interface Auth {
    loggedIn:boolean;
    userId?: string;
}
interface AuthInit {
    loading:boolean;
    auth?: Auth;
}

export const AuthContext = React.createContext<Auth>({loggedIn: false});

export function useAuth(): Auth{
    return useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
    const [AuthInit, setAuthInit] = useState<AuthInit>({loading: true});
    useEffect(() => {
        return firebaseAuth.onAuthStateChanged((firebaseUser) => {
        const auth = firebaseUser ?
        {loggedIn:true, userId:firebaseUser.uid} :
        {loggedIn: false};
        setAuthInit({loading:false, auth});
      });
    }, []);
    return AuthInit;
}