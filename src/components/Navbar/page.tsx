import { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Send, Bell, Badge, LogOut } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import TopTabs from "./Tabs/page";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

// Enhanced mock API call function
function mockApiCall(
  url: string,
  method: string,
  _headers: any,
  body: any
): Promise<{ tasks?: Task[]; success?: boolean }> {
  if (url.includes("/api/task/getTasks") && method === "GET") {
    return Promise.resolve({
      tasks: [
        {
          id: 1,
          title: "Task 1",
          description: "Complete the assignment",
          dueDate: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
        },
        {
          id: 2,
          title: "Task 2",
          description: "Prepare for the meeting",
          dueDate: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
        },
      ],
    });
  }

  if (url.includes("/api/task/addTask") && method === "POST") {
    console.log("Mock Add Task Request:", body);
    return Promise.resolve({ success: true });
  }

  return Promise.reject("Invalid API call");
}

// Function to request notification permissions
const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications");
    return;
  }

  if (Notification.permission !== "granted") {
    await Notification.requestPermission();
  }
};

// Function to show browser notification
const showBrowserNotification = (title: string, body: string) => {
  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      body: body,
      icon: "/icon.png", // Add your extension icon path here
      requireInteraction: true, // Keep notification until user interacts with it
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  }
};

export default function Navbar() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [notifiedTasks, setNotifiedTasks] = useState<Set<number>>(new Set());

  // Request notification permission on component mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Enhanced task fetching and notification logic
  useEffect(() => {
    const fetchTasks = () => {
      mockApiCall(
        "http://localhost:8080/api/task/getTasks",
        "GET",
        { "X-Authorization": `${localStorage.getItem("token")}` },
        null
      ).then((response) => {
        if (response?.tasks) {
          setTasks(response.tasks || []);
        }
      });
    };

    fetchTasks();
    const interval = setInterval(fetchTasks, 60 * 1000); // Fetch tasks every minute
    return () => clearInterval(interval);
  }, []);

  // Enhanced notification system
  useEffect(() => {
    const checkTasksDueDate = () => {
      const now = Date.now();
      
      tasks.forEach((task) => {
        const dueDate = new Date(task.dueDate).getTime();
        const timeUntilDue = dueDate - now;
        
        // Check for tasks due in 2 hours and 1 hour
        const twoHourMark = 5000;
        const oneHourMark = 5000;
        console.log(oneHourMark);
        if (!notifiedTasks.has(task.id)) {
          if (timeUntilDue > 0 && timeUntilDue <= twoHourMark) {
            const hoursLeft = Math.ceil(timeUntilDue / (60* 1000));
            
            // Show browser notification
            showBrowserNotification(
              `Task Due Soon: ${task.title}`,
              `This task is due in ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}!\n${task.description}`
            );
            
            // Show toast notification
            toast.warning(`Task "${task.title}" is due in ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}!`, {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            
            // Mark task as notified
            setNotifiedTasks(prev => new Set([...prev, task.id]));
          }
        }
      });
    };

    const notificationInterval = setInterval(checkTasksDueDate, 5 * 60 * 1000); // Check every 5 minutes
    checkTasksDueDate(); // Initial check

    return () => clearInterval(notificationInterval);
  }, [tasks, notifiedTasks]);

  // Rest of your existing code remains the same
  const handleNotificationClick = () => {
    const upcomingTasks = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate).getTime();
      const now = Date.now();
      return dueDate > now && dueDate - now <= 2 * 60 * 60 * 1000;
    });

    if (upcomingTasks.length > 0) {
      upcomingTasks.forEach(task => {
        const timeUntilDue = new Date(task.dueDate).getTime() - Date.now();
        const hoursLeft = Math.ceil(timeUntilDue / (60 * 60 * 1000));
        
        toast.info(`Task "${task.title}" is due in ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}!`, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    } else {
      toast.info("No upcoming tasks!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleOnChange = (e: any) => setName(e.target.value);
  const handleTextArea = (e: any) => setDescription(e.target.value);
  const handleDateSection = (e: any) => setDate(e.target.value);

  const addTask = () => {
    mockApiCall(
      "http://localhost:8080/api/task/addTask",
      "POST",
      { "X-Authorization": `${localStorage.getItem("token")}` },
      { title: name, description: description, dueDate: date }
    ).then((response) => {
      if (response?.success) {
        toast.success("Task added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setName("");
        setDescription("");
        setDate("");
      }
    });
  };

  return (
    <div className="flex-1 flex-col space-y-8 p-8 md:flex">
      <ToastContainer />
      <div className="flex items-center justify-between space-y-5 md:space-y-0 md:space-x-5">
        <div className="inline-block mr-5 mt-2">
          <h2 className="text-xl font-bold tracking-tight">Hey Buddy!!!</h2>
        </div>

        <div className="inline-block items-center space-x-2">
        <Button variant="default" >
          <LogOut size={24}/>
        </Button>
          <Button variant="secondary">
            <Send size={24} />
          </Button>

          <div className="relative inline-block">
            <Button variant="secondary" onClick={handleNotificationClick}>
              <Bell size={24} />
            </Button>
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
              {
                tasks.filter((task) => {
                  const dueDate = new Date(task.dueDate).getTime();
                  const now = Date.now();
                  return dueDate > now && dueDate - now <= 2 * 60 * 60 * 1000;
                }).length
              }
            </Badge>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="default" className="mr-2">
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
                    <label htmlFor="name">Task Name</label>
                    <Input
                      id="name"
                      className="col-span-2 h-8"
                      value={name}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="description">Task Description</label>
                    <Textarea
                      id="description"
                      className="col-span-2 h-20"
                      value={description}
                      onChange={handleTextArea}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="DueDate">Due Date</label>
                    <Input
                      id="DueDate"
                      type="date"
                      className="col-span-2 h-8"
                      value={date}
                      onChange={handleDateSection}
                    />
                  </div>
                  <Button variant="secondary" onClick={addTask}>
                    Add Task
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-4">
        <Separator />
      </div>
      <TopTabs />
    </div>
  );
}