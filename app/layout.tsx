import type {Metadata} from 'next';
import {Epilogue, Cormorant_Garamond, Sora} from 'next/font/google';
import './globals.css';

// Primary font - Epilogue (modern, elegant, luxury feel)
const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
});

// Display font - Cormorant Garamond (luxury, high-contrast serif for headings)
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

// Accent font - Sora (contemporary, geometric accent)
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'My School Dashboard',
    template: '%s | My School Dashboard',
  },
  description:
    'Admin dashboard for My School - Manage students, teachers.',
  keywords: [
    'school dashboard',
  ],
  authors: [{name: 'Win L.'}],
  creator: 'Win L.',
  publisher: 'Win L.',

  // Favicon and icons configuration
  icons: {
    icon: [
      {url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
      {url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
    ],
    apple: [
      {url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'},
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#e4b755', // Brand color
      },
    ],
  },
  // Web app manifest
  manifest: '/site.webmanifest',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang={"en"}
      className={`${epilogue.variable} ${cormorant.variable} ${sora.variable}`}>
      <head>
        {/* Favicon fallback for older browsers */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${epilogue.className} min-h-screen antialiased`}>
         <div className="min-h-screen bg-background">
              <main className="min-h-screen">{children}</main>
          </div>
      </body>
    </html>
  );
}
