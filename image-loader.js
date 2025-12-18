'use client'

export default function myImageLoader({ src, width, quality }) {
    if (process.env.NODE_ENV === 'development') {
        return src
    }
    // The optimized images are stored in /images/nextImageExportOptimizer/
    // So we need to construct the path correctly
    const imagePath = src.replace('/images/', '')
    const imageNameWithoutExt = imagePath.substring(0, imagePath.lastIndexOf('.'))
    return `/images/${process.env.nextImageExportOptimizer_exportFolderName}/${imageNameWithoutExt}-opt-${width}.WEBP`
}
