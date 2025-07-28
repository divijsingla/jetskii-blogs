import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface BlogLayoutProps {
  children: ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BlogLayout;