import NavigationMenuDemo from "@/components/test_header";


export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="h-full w-screen bg-t-white pb-4">
          <NavigationMenuDemo/>
          <div className="h-full w-full flex justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
