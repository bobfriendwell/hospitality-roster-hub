
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-6">找不到頁面</p>
        <p className="text-gray-500 mb-8">您嘗試訪問的頁面不存在或已被移除。</p>
        <Button asChild className="inline-flex items-center">
          <a href="/">
            <Home className="h-4 w-4 mr-2" />
            返回首頁
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
