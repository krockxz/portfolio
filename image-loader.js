'use client'

export default function myImageLoader({ src, width, quality }) {
    if (process.env.NODE_ENV === 'development') {
        return src
    }
    return `/${process.env.nextImageExportOptimizer_exportFolderName}${src}?width=${width}&quality=${quality || 75}`
}
