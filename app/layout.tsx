import './globals.css'
import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: 'Crabionics',
  description: 'Engineering Predictable Mud Crab Production',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-neutral-100">
        <Navbar />
        <div className="pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
