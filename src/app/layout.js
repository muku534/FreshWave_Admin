"use client";

import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/app/firebase';
import Navbar from '@/components/menu/page';
import { ThemeProvider } from './theme_provider';
import './globals.css';
import { useRouter } from 'next/navigation';
import Signin from './Signin/page';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
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

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {user && <Navbar onLogout={handleLogout} />}
          {user ? children : <Signin />}
        </ThemeProvider>
      </body>
    </html>
  );
}
