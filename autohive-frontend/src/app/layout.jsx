import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
  variable: "--font-poppins", 
});

export const metadata = {
  title: "AutoHive - Vehicle Spare Parts Marcketplace",
  description: "Modern Spare Parts & Vehicle Services Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
            className={`${poppins.variable} font-sans antialiased text-slate-900 bg-white`}      >
        {children}
      </body>
    </html>
  );
}
