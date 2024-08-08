"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { db } from "../firebase"
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export default function Settings() {

    const [admin, setAdmin] = useState(null);
    const [adminData, setAdminData] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeOption, setActiveOption] = useState('general');
    const [adminUid, setAdminUid] = useState('');
    const [canAddAdmin, setCanAddAdmin] = useState(false);

    const handleOptionSelect = (option) => {
        setActiveOption(option);
    };

    const addAdmin = async () => {
        try {
            if (!admin) {
                alert("Please log in first.");
                return;
            }
            if (!admin.user) {
                alert("User is not authenticated.");
                return;
            }
            // Make sure adminUid is not empty
            if (!adminUid) {
                alert("Admin UID not found.");
                return;
            }
            if (canAddAdmin) {
                console.log(`Admin ${adminUid} and isAdmin is ${adminData.isAdmin}.`);
                const adminDataToAdd = {
                    email,
                    password,
                    isAdmin: true
                };
                await addDoc(collection(db, 'admin'), adminDataToAdd);
                setEmail('');
                setPassword('');
                alert("Admin added successfully.");
            } else {
                console.log("Admin does not exist or isAdmin is false.");
                alert("You do not have permission to add another admin.");
            }
        } catch (error) {
            console.error('Error adding admin:', error);
            alert('An error occurred while adding admin. Please try again later.');
        }
    };


    const mainContent = (activeOption) => {
        if (activeOption === 'general') {
            return (
                <>
                    <Card x-chunk="dashboard-04-chunk-1">
                        <CardHeader>
                            <CardTitle>Store Name</CardTitle>
                            <CardDescription>
                                Used to identify your store in the marketplace.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <Input placeholder="Store Name" />
                            </form>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button>Save</Button>
                        </CardFooter>
                    </Card>
                    <Card x-chunk="dashboard-04-chunk-2">
                        <CardHeader>
                            <CardTitle>Plugins Directory</CardTitle>
                            <CardDescription>
                                The directory within your project, in which your plugins are located.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="flex flex-col gap-4">
                                <Input
                                    placeholder="Project Name"
                                    defaultValue="/content/plugins" />
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="include" defaultChecked />
                                    <label
                                        htmlFor="include"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Allow administrators to change the directory.
                                    </label>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button>Save</Button>
                        </CardFooter>
                    </Card>
                </>
            );
        }
        if (activeOption === 'security') {
            return (
                <>
                    security
                </>
            );
        }
        if (activeOption === 'integrations') {
            return (
                <>
                    integrations
                </>
            );
        }
        if (activeOption === 'support') {
            return (
                <>
                    support
                </>
            );
        }
        if (activeOption === 'org') {
            return (
                <>
                    org
                </>
            );
        }
        if (activeOption === 'advanced') {
            return (
                <>
                    <Card x-chunk="dashboard-04-chunk-1">
                        <CardHeader>
                            <CardTitle>Add Admin</CardTitle>
                            <CardDescription>
                                Used to add admin for the dashboard.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <Input type="email" value={email}
                                    onChange={(e) => setEmail(e.target.value)} placeholder="Admin Email" /><br></br>
                                <Input type="password" value={password}
                                    onChange={(e) => setPassword(e.target.value)} placeholder="Admin Password" />
                            </form>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button onClick={addAdmin}>Add Admin</Button>
                        </CardFooter>
                    </Card>
                </>
            );
        }
    };

    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold">Settings</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav
                    className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
                >
                    <Link href="#" id="general" onClick={() => handleOptionSelect('general')} className={`${activeOption === 'general' ? 'font-semibold text-gray-900 p-1 pl-2.5 bg-white border-t' : ''}`}>
                        General
                    </Link>
                    <Link href="#" id="security" onClick={() => handleOptionSelect('security')} className={`${activeOption === 'security' ? 'font-semibold text-gray-900 p-1 pl-2.5 bg-white ' : ''}`}>Security</Link>
                    <Link href="#" id="integrations" onClick={() => handleOptionSelect('integrations')} className={`${activeOption === 'integrations' ? 'font-semibold text-gray-900 p-1 pl-2.5 bg-white ' : ''}`}>Integrations</Link>
                    <Link href="#" id="support" onClick={() => handleOptionSelect('support')} className={`${activeOption === 'support' ? 'font-semibold text-gray-900 p-1 pl-2.5 bg-white ' : ''}`}>Support</Link>
                    <Link href="#" id="org" onClick={() => handleOptionSelect('org')} className={`${activeOption === 'org' ? 'font-semibold text-gray-900 p-1 pl-2.5 bg-white ' : ''}`}>Organizations</Link>
                    <Link href="#" id="advanced" onClick={() => handleOptionSelect('advanced')} className={`${activeOption === 'advanced' ? 'font-semibold text-gray-900 p-1 pl-2.5 bg-white ' : ''}`}>Advanced</Link>
                </nav>
                <div className="grid gap-6">
                    {mainContent(activeOption)}
                </div>
            </div>
        </main>
    )
}