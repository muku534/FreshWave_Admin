'use client';

import React, { useEffect, useState, useContext, createContext } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/app/firebase';
import { useRouter } from 'next/navigation';
import Signin from '@/app/Signin/page';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [redirectTo, setRedirectTo] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'admins', currentUser.uid));
                    const userData = userDoc.data();

                    if (userData?.role === 'admin') {
                        setUser({ ...currentUser, ...userData });
                        setRedirectTo('/');
                    } else {
                        setRedirectTo('/Signin');
                    }
                } catch (error) {
                    console.error('Error checking user role:', error);
                    setRedirectTo('/Signin');
                }
            } else {
                setRedirectTo('/Signin');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (redirectTo) {
            router.replace(redirectTo);
        }
    }, [redirectTo, router]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            router.replace('/Signin');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (!user) {
        return <Signin />;
    }

    return (
        <AuthContext.Provider value={{ user, loading, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);