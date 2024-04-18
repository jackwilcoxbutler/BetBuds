import { Footer } from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";


export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const temp = await getServerSession(authOptions);
  const userID = temp?.user.id

  const query = await prisma.user.findUniqueOrThrow({
    where:{
      id : userID
    },
    select :{
      username : true
    }
  });

  const username = query.username;

  
  return (
    <html lang="en">
      <body>
        <div className="h-max bg-endless-constelation pb-4">
          <NavBar username={username}/>
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
