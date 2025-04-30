"use client"

import {UploadImageRequest, UploadImageResponse} from "@/lib/apiTypes";

interface Output {
    imageUrl?: string;
    error?: Error;
}

export async function uploadImage(file: File, accessToken: string): Promise<Output> {
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    console.log(file);

    const response = await fetch('/api/upload/image', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        body: uploadFormData,
    });

    if (!response.ok) {
        return {error: new Error(`Could not upload image: ${response.status}`)}
    }

    const responseData: UploadImageResponse = await response.json();
    return {imageUrl: responseData.imageUrl};
}