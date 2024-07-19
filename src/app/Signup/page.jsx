"use client"

import React, { useState } from "react"
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
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import toast, { Toaster } from "react-hot-toast"

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [specialCode, setSpecialCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const VALID_SPECIAL_CODES = [process.env.SPECIAL_CODE]; // Add all valid special codes here

    const handleSignUp = async () => {
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            toast.error(error);
            return;
        }

        if (!VALID_SPECIAL_CODES.includes(specialCode)) {
            setError("Invalid Special Code");
            toast.error(error);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'admins', user.uid), {
                firstName,
                lastName,
                email,
                role: 'admin'
            });

            setSuccess("Account created successfully!");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setSpecialCode("");

            setTimeout(() => {
                router.push('/Signin');
            }, 1000);

            toast.success(success);
        } catch (error) {
            setError(error.message);
            toast.error(error);
        }
    }


    return (
        <div className="mt-16">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" placeholder="Max" value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input id="last-name" placeholder="Robinson" value={lastName}
                                    onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                        </div>
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
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="special-code">specialCode</Label>
                            <Input id="special-code" type="password" value={specialCode}
                                onChange={(e) => setSpecialCode(e.target.value)} required />
                        </div>
                        {error && <div className="text-red-500 text-sm">{error}</div>}
                        {success && <div className="text-green-500 text-sm">{success}</div>}
                        <Button className="w-full" onClick={handleSignUp}>
                            Create an account
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/Signin" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
