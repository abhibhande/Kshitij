import { Bell, Link } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopTabs from "./Tabs/page";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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
        <div className="inline-block mr-5 mt-2">
          {" "}
          {/* Reduced top margin */}
          <h2 className="text-xl font-bold tracking-tight">Hey Buddy!!!</h2>
        </div>

        <div className="inline-block items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary" className="mr-2">
                +add
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium leading-none">Add Task</h3>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="name">Task Name</Label>
                    <Input id="name" className="col-span-2 h-8" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="description">Task Description</Label>
                    <Textarea id="description" className="col-span-2 h-20" />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="DueDate">Due Date</Label>
                    <Input
                      id="DueDate"
                      type="date"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <Button variant="secondary">Add Task</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

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
