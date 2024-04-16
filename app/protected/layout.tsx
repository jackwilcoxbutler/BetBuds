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
        <div className="h-max bg-endless-constelation pb-4">
          <NavBar/>
          <div className="h-full w-full flex justify-center">
            {children}
          </div>
          <footer>
            <Footer/>
          </footer>
        </div>
      </body>
    </html>
  )
}
