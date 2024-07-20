"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignIn = async () => {
        setError("");

        // Validate input fields
        if (!email || !password) {
            toast.error("Please fill in both email and password.");
            return;
        }
        toast.promise(
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    return userCredential.user.getIdToken();
                })
                .then((token) => {
                    localStorage.setItem("token", token);
                    setTimeout(() => {
                        router.push('/');
                    }, 1000);
                }),
            {
                loading: 'Signing in...',
                success: <b>Login Successfully</b>,
                error: (err) => {
                    setError(err.message);  // Set the error message
                    return <b>{err.message === 'Firebase: Error (auth/invalid-credential).' ? 'invalid-credential' : 'Network issue'}</b>; // Display the error message in the toast
                }
            }
        ).catch((error) => {
            setError(error.message);  // Ensure the error state is set
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <Button type="button" className="w-full" onClick={handleSignIn} >
                            Login
                        </Button>

                    </div>
                    {/** <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/Signup" className="underline">
                            Sign up
                        </Link>
                    </div>  */}
                </CardContent>
            </Card>
        </div>
    )
}
