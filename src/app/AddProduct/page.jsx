"use client"

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { db, storage, auth } from '../firebase';
import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";

const ReactImagePickerEditor = dynamic(() => import('react-image-picker-editor'), { ssr: false });
import 'react-image-picker-editor/dist/index.css';
import Image from "next/image"
import Link from "next/link"
import {
    ChevronLeft,
    PlusCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [admin, setAdmin] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stock1, setStock1] = useState('');
    const [stock2, setStock2] = useState('');
    const [stock3, setStock3] = useState('');
    const [price1, setPrice1] = useState('');
    const [price2, setPrice2] = useState('');
    const [price3, setPrice3] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [status, setStatus] = useState('');
    const [imageSrc, setImageSrc] = useState([]);

    const config = {
        borderRadius: '8px',
        language: 'en',
        width: '330px',
        height: '250px',
        objectFit: 'contain',
        // aspectRatio: 4 / 3,
        compressInitial: null,
    };


    const handleImageChange = async (newImage) => {
        if (newImage && newImage !== '') {
            console.log('New image added:', newImage);
            // Create a blob from the base64 image
            const blob = await fetch(newImage).then(r => r.blob());
            // Upload the blob to Firebase Storage
            const storageRef = ref(storage, `images/${Date.now()}`);
            const snapshot = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setImageSrc([...imageSrc, downloadURL]);
        } else {
            console.log('Invalid image data:', newImage);
        }
    };


    const handleDeleteImage = (index) => {
        const updatedImages = imageSrc.filter((_, imgIndex) => imgIndex !== index);
        setImageSrc(updatedImages);
    };

    const saveProduct = async () => {
        try {
            // Store product data in the 'products' collection
            const productData = {
                name,
                description,
                stockPriceData: [
                    {
                        sku: 'GGPC-001',
                        stock: stock1,
                        price: price1,
                    },
                    {
                        sku: 'GGPC-002',
                        stock: stock2,
                        price: price2,
                    },
                    {
                        sku: 'GGPC-003',
                        stock: stock3,
                        price: price3,
                    }
                ],
                category,
                subcategory,
                status,
                imageSrc
            };

            // Add product document to the 'products' collection
            await addDoc(collection(db, 'products'), productData);
            clearForm();
            toast.success('Product saved successfully.')
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error('Error saving product')
        }
    };


    const clearForm = () => {
        // Clear form fields
        setName('');
        setDescription('');
        setStock1('');
        setStock2('');
        setStock3('');
        setPrice1('');
        setPrice2('');
        setPrice3('');
        setCategory('');
        setSubcategory('');
        setStatus('');

        // Clear image state
        setImageSrc([]);
    };


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="grid max-w-full flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Link href={'/products'}>
                                <Button variant="outline" size="icon" className="h-7 w-7">
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Back</span>
                                </Button>
                            </Link>
                            {/*<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                    Pro Controller
                                </h1>
                                <Badge variant="outline" className="ml-auto sm:ml-0">
                                    In stock
                                </Badge>*/}
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Button variant="outline" size="sm">
                                    Discard
                                </Button>
                                <Button size="sm" onClick={saveProduct}>Save Product</Button>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <Card x-chunk="dashboard-07-chunk-0">
                                    <CardHeader>
                                        <CardTitle>Product Details</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    className="w-full"
                                                    defaultValue="Gamer Gear Pro Controller"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea
                                                    id="description"
                                                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                                    className="min-h-32"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card x-chunk="dashboard-07-chunk-1">
                                    <CardHeader>
                                        <CardTitle>Stock</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[100px]">SKU</TableHead>
                                                    <TableHead>Stock</TableHead>
                                                    <TableHead>Price</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="font-semibold">
                                                        GGPC-001
                                                    </TableCell>
                                                    <TableCell>
                                                        <Label htmlFor="stock-1" className="sr-only">
                                                            Stock
                                                        </Label>
                                                        <Input
                                                            id="stock-1"
                                                            type="number"
                                                            defaultValue="100"
                                                            value={stock1}
                                                            onChange={(e) => setStock1(e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Label htmlFor="price-1" className="sr-only">
                                                            Price
                                                        </Label>
                                                        <Input
                                                            id="price-1"
                                                            type="number"
                                                            defaultValue="99.99"
                                                            value={price1}
                                                            onChange={(e) => setPrice1(e.target.value)}
                                                        />
                                                    </TableCell>

                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-semibold">
                                                        GGPC-002
                                                    </TableCell>
                                                    <TableCell>
                                                        <Label htmlFor="stock-2" className="sr-only">
                                                            Stock
                                                        </Label>
                                                        <Input
                                                            id="stock-2"
                                                            type="number"
                                                            defaultValue="143"
                                                            value={stock2}
                                                            onChange={(e) => setStock2(e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Label htmlFor="price-2" className="sr-only">
                                                            Price
                                                        </Label>
                                                        <Input
                                                            id="price-2"
                                                            type="number"
                                                            defaultValue="99.99"
                                                            value={price2}
                                                            onChange={(e) => setPrice2(e.target.value)}
                                                        />
                                                    </TableCell>

                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="font-semibold">
                                                        GGPC-003
                                                    </TableCell>
                                                    <TableCell>
                                                        <Label htmlFor="stock-3" className="sr-only">
                                                            Stock
                                                        </Label>
                                                        <Input
                                                            id="stock-3"
                                                            type="number"
                                                            defaultValue="32"
                                                            value={stock3}
                                                            onChange={(e) => setStock3(e.target.value)}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Label htmlFor="price-3" className="sr-only">
                                                            Stock
                                                        </Label>
                                                        <Input
                                                            id="price-3"
                                                            type="number"
                                                            defaultValue="99.99"

                                                            value={price3}
                                                            onChange={(e) => setPrice3(e.target.value)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                    <CardFooter className="justify-center border-t p-4">
                                        <Button size="sm" variant="ghost" className="gap-1">
                                            <PlusCircle className="h-3.5 w-3.5" />
                                            Add Variant
                                        </Button>
                                    </CardFooter>
                                </Card>
                                <Card x-chunk="dashboard-07-chunk-2">
                                    <CardHeader>
                                        <CardTitle>Product Category</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6 sm:grid-cols-3">
                                            <div className="grid gap-3">
                                                <Label htmlFor="category">Category</Label>
                                                <Select>
                                                    <SelectTrigger
                                                        id="category"
                                                        aria-label="Select category"
                                                    >
                                                        <SelectValue
                                                            placeholder="Select category"
                                                            value={category}
                                                            onChange={(e) => setCategory(e.target.value)} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="clothing">Clothing</SelectItem>
                                                        <SelectItem value="electronics">
                                                            Electronics
                                                        </SelectItem>
                                                        <SelectItem value="accessories">
                                                            Accessories
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="subcategory">
                                                    Subcategory (optional)
                                                </Label>
                                                <Select>
                                                    <SelectTrigger
                                                        id="subcategory"
                                                        aria-label="Select subcategory"
                                                    >
                                                        <SelectValue
                                                            placeholder="Select subcategory"
                                                            value={subcategory}
                                                            onChange={(e) => setSubcategory(e.target.value)} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="t-shirts">T-Shirts</SelectItem>
                                                        <SelectItem value="hoodies">Hoodies</SelectItem>
                                                        <SelectItem value="sweatshirts">
                                                            Sweatshirts
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                <Card x-chunk="dashboard-07-chunk-3">
                                    <CardHeader>
                                        <CardTitle>Product Status</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="status">Status</Label>
                                                <Select>
                                                    <SelectTrigger id="status" aria-label="Select status">
                                                        <SelectValue
                                                            placeholder="Select status"
                                                            value={status}
                                                            onChange={(e) => setStatus(e.target.value)}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="draft">Draft</SelectItem>
                                                        <SelectItem value="published">Active</SelectItem>
                                                        <SelectItem value="archived">Archived</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card
                                    className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                                >
                                    <CardHeader>
                                        <CardTitle>Product Images</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-2">
                                            <ReactImagePickerEditor
                                                config={config}
                                                // imageSrcProp={initialImage}
                                                imageChanged={handleImageChange}
                                            />

                                            {imageSrc.length === 0 ? (
                                                <p>No images selected</p>
                                            ) : (
                                                <div className="grid grid-cols-3 gap-2">
                                                    {imageSrc.map((src, index) => (
                                                        <div key={index} className="relative">
                                                            <img
                                                                src={src}
                                                                style={{
                                                                    maxHeight: '900px',
                                                                    maxWidth: '100%',
                                                                    objectFit: 'contain',
                                                                    background: 'black',
                                                                }}
                                                                alt={`Selected image ${index}`}
                                                            />
                                                            <button
                                                                onClick={() => handleDeleteImage(index)}
                                                                className="absolute top-1 right-1 p-1 rounded-full bg-white text-gray-700"
                                                            >
                                                                X
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card x-chunk="dashboard-07-chunk-5">
                                    <CardHeader>
                                        <CardTitle>Archive Product</CardTitle>
                                        <CardDescription>
                                            Lipsum dolor sit amet, consectetur adipiscing elit.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div></div>
                                        <Button size="sm" variant="secondary">
                                            Archive Product
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 md:hidden">
                            <Button variant="outline" size="sm" onClick={clearForm}>
                                Discard
                            </Button>
                            <Button size="sm" onClick={saveProduct}>Save Product</Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AddProduct;