import { Bell, Link } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopTabs from "./Tabs/page";

export default function Navbar() {
  const handleNotificationClick = () => {
    toast.info("You have new notifications!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="flex-1 flex-col space-y-8 p-8 md:flex">
      {/* Toast container for notifications */}
      <ToastContainer />

      <div className="flex items-center justify-between space-y-5 md:space-y-0 md:space-x-5">
        <div className="inline-block mr-5 mt-5">
          <h2 className="text-xl font-bold tracking-tight ">Hey Buddy!!!</h2>
        </div>
        <div className="inline-block items-center space-x-2">
          <Button variant="secondary" className="mr-2">
            + Add
          </Button>
          <Button variant="secondary">
            <Link size={24} />
          </Button>
          <div className="relative inline-block">
            <Button variant="secondary" onClick={handleNotificationClick}>
              <Bell size={24} />
            </Button>
            {/* Notification count badge */}
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
              3
            </Badge>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Separator />
      </div>
      <TopTabs />
    </div>
  );
}
