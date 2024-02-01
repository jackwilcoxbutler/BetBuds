import { Footer } from "@/components/Footer";
import NavBar from "@/components/NavBar";


export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen w-screen bg-endless-constelation pb-4">
          <NavBar/>
          <div className="h-full w-full flex justify-center">
            {children}
          </div>
          <Footer/>
        </div>
      </body>
    </html>
  )
}
