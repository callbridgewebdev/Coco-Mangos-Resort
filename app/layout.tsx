import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import ThemeProvider from "@/components/theme-provider"
import "./globals.css"
import FooterComponent from "@/components/footer"
import FloatingSocials from "@/components/floating-socials"
import PWAInstallPrompt from "@/components/pwa-install-prompt"
import CookieConsent from "@/components/cookie-consent"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Coco Mangos Place Resort - Luxury Tropical Paradise in Panglao, Bohol",
  description:
    "Experience luxury at Coco Mangos Place Resort in Panglao, Bohol. Beachfront accommodations, exclusive amenities, tour packages, and unforgettable tropical adventures await you. Book your paradise getaway today.",
  keywords: [
    "Coco Mangos Resort",
    "Panglao Bohol Resort",
    "Luxury Beach Resort",
    "Tropical Paradise",
    "Bohol Accommodations",
    "Function Room",
    "Tour Packages",
    "Philippines Resort",
  ],
  generator: "v0.app",
  applicationName: "Coco Mangos Place Resort",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Coco Mangos Place",
  },
  icons: {
    icon: "/coco-mangos-logo.png",
    apple: "/coco-mangos-logo.png",
    shortcut: "/coco-mangos-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cocomangosplace.com",
    siteName: "Coco Mangos Place Resort",
    title: "Coco Mangos Place Resort - Luxury Tropical Paradise",
    description:
      "Discover luxury beachfront accommodations, exclusive tours, and world-class amenities at Coco Mangos Place Resort in Panglao, Bohol.",
    images: [
      {
        url: "/coco-mangos-logo.png",
        width: 1200,
        height: 630,
        alt: "Coco Mangos Place Resort",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@cocomangosplace",
    creator: "@cocomangosplace",
    title: "Coco Mangos Place Resort - Luxury Tropical Paradise",
    description:
      "Beachfront luxury resort in Panglao, Bohol. Experience paradise with exclusive accommodations and tours.",
    images: ["/coco-mangos-logo.png"],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#D4A574" },
    { media: "(prefers-color-scheme: dark)", color: "#D4A574" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="manifest" content="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Coco Mangos Place" />
        <meta name="theme-color" content="#D4A574" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="author" content="Coco Mangos Place Resort" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://cocomangosplace.com" />
        <link rel="icon" href="/coco-mangos-logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/coco-mangos-logo.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (localStorage.getItem('theme') === 'dark' || 
                  (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              }
              
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/api/sw?v=' + Date.now(), { 
                    scope: '/',
                    updateViaCache: 'none'
                  })
                    .then(reg => {
                      console.log('[v0] SW registered successfully');
                      setInterval(() => {
                        reg.update();
                      }, 60000);
                    })
                    .catch(err => console.error('[v0] SW registration failed:', err))
                })
              }
            `,
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.googleTranslateElementInit = function() {
                if (typeof google !== 'undefined' && google.translate) {
                  new google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: 'en,zh-CN,zh-TW,hi,es,ar,fr,bn,pt,ru,id,ur,de,ja,ha,mr,vi,te,tr,sw,tl,ta,yue,fa,ko,th,jv,it,gu,am,kn,uk,pl,ms,ro,nl,el,cs,sv,he,hu,da,fi,no,sk,sl,bg,hr,et,lt,lv,ga,mt,cy,sq,mk,is',
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: true
                  }, 'google-translate-element');
                  const userLanguage = navigator.language || navigator.userLanguage || 'en';
                  document.documentElement.lang = userLanguage.split('-')[0];
                }
              };
              
              const initTranslate = function() {
                if (document.readyState === 'complete' || document.readyState === 'interactive') {
                  window.googleTranslateElementInit();
                } else {
                  document.addEventListener('DOMContentLoaded', function() {
                    window.googleTranslateElementInit();
                  });
                }
              };
              
              setTimeout(initTranslate, 1000);
            `,
          }}
        />
        <script async src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          <FloatingSocials />
          <PWAInstallPrompt />
          <CookieConsent />
          {children}
        </ThemeProvider>
        <Analytics />
        <FooterComponent />
      </body>
    </html>
  )
}
