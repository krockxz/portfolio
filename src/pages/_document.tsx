import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#0a0e17" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Kunal Roy Choudhury - Full-stack developer specializing in React, Node.js, and modern web technologies" />
        <meta name="keywords" content="full-stack developer, React, Node.js, TypeScript, portfolio, web development, JavaScript, Next.js" />
        <meta name="author" content="Kunal Roy Choudhury" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Kunal Roy Choudhury - Full-stack Developer" />
        <meta property="og:description" content="Portfolio showcasing modern web development projects and skills in React, Node.js, and TypeScript" />
        <meta property="og:image" content="/kunal.jpg" />
        <meta property="og:url" content="https://kunalroy.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Kunal Roy Choudhury Portfolio" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kunal Roy Choudhury - Full-stack Developer" />
        <meta name="twitter:description" content="Portfolio showcasing modern web development projects and skills" />
        <meta name="twitter:image" content="/kunal.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://kunalroy.dev" />
        
        {/* Font Optimization */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0e17" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Kunal Roy Choudhury" />
        <link rel="apple-touch-icon" href="/kunal.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
