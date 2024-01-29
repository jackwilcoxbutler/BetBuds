import NavBar from "@/components/NavBar";


export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="h-full w-screen bg-t-white pb-4">
          <NavBar/>
          <div className="h-full w-full flex justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
