"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/app/firebase';

const withAdminAccess = (WrappedComponent) => {
    const WithAdminAccess = (props) => {
        const [loading, setLoading] = useState(true);
        const [user, setUser] = useState(null);
        const router = useRouter();

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                if (currentUser) {
                    const userDoc = await getDoc(doc(db, 'admins', currentUser.uid));
                    const userData = userDoc.data();

                    if (userData?.role === 'admin') {
                        setUser({ ...currentUser, ...userData });
                    } else {
                        router.push('/unauthorized');
                    }
                } else {
                    router.push('/Signin');
                }
                setLoading(false);
            });

            return () => unsubscribe();
        }, [router]);

        if (loading) {
            return <p>Loading...</p>;
        }

        return user ? <WrappedComponent {...props} user={user} /> : null;
    };

    WithAdminAccess.displayName = `WithAdminAccess(${getDisplayName(WrappedComponent)})`;

    return WithAdminAccess;
};

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withAdminAccess;
