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
    const router = useRouter();

    useEffect(() => {
        const checkUserAuth = async (currentUser) => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'admins', currentUser.uid));
                    const userData = userDoc.data();

                    if (userData?.role === 'admin') {
                        setUser({ ...currentUser, ...userData });
                        router.replace('/');
                    } else {
                        router.replace('/Signin');
                    }
                } catch (error) {
                    console.error('Error checking user role:', error);
                    router.replace('/Signin');
                } finally {
                    setLoading(false);
                }
            } else {
                router.replace('/Signin');
                setLoading(false);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(true);
            checkUserAuth(currentUser);
        });

        return () => unsubscribe();
    }, [router]);

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
