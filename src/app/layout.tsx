import type { Metadata } from "next";
import { Nanum_Myeongjo, Nanum_Gothic } from "next/font/google";
import "./globals.css";

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nanum-myeongjo",
});

const nanumGothic = Nanum_Gothic({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nanum-gothic",
});

export const metadata: Metadata = {
  title: "BibleTyping - 성경 타자치기 묵상",
  description: "성경 구절을 따라 쓰며 깊이 묵상하고 암송하는 공간입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${nanumMyeongjo.variable} ${nanumGothic.variable} font-sans antialiased bg-[#fdfdfd] text-[#2c2c2c]`}
      >
        {children}
      </body>
    </html>
  );
}
