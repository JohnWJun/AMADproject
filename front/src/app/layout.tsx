import type { Metadata } from "next";
import pretendard from "next/font/local";
import "./globals.css";
import React from "react";
import dynamic from 'next/dynamic'

// const inter = Noto_Sans_KR({ subsets: ["latin"] });
const inter = pretendard(
  { src: '../../public/fonts/woff2/Pretendard-Light.woff2' }
)
export const metadata: Metadata = {
  title: "AMAD:A Mission A Day",
  description: "Have a daily mission in God"
};

export default function RootLayout({children
}: {
    children: React.ReactNode
                                   }
) {
  const ComponentA = dynamic(() => import('@/app/_component/RecoilRootWrapper'),{ ssr: false })
  return (
    <html lang="en">
      {inter && 
      <>
      <body className={inter.className}>
      {/* <body> */}
      <ComponentA>
          {children}
      </ComponentA>
      </body>
      </>
      }
    </html>
  );
}
