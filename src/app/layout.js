import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { dbConnect } from "../../service/mongo";

export const metadata = {
  title: "LMS",
  description: "Learning Management System",
};

export default  async function RootLayout({ children }) {

  const conn= await dbConnect();
  // MongoDB-এর সব Collections/Tables-এর নাম পাওয়ার জন্য
  if (conn?.connection?.db) {
    const collections = await conn.connection.db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    console.log("Database Collections/Tables:", collectionNames);
  }

  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        {children}

        <Toaster />
      </body>
    </html>
  );
}
