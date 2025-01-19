
import { Badge } from "@/components/ui/badge"; // Placeholder for an icon component from ShadcnUI

import { MdCheckCircle, MdPending, MdHourglassEmpty } from "react-icons/md"; // Use relevant icons
import "@/components/css/task.css"; // Ensure this file includes corner styling
import {
  Card,
} from "@/components/ui/card"
import './css/task.css'
import {  useEffect, useState } from "react"
import { Progress } from "@radix-ui/react-progress";
import { ArrowRight } from "lucide-react";
import { Label } from "recharts";
import TaskHeader from "./TaskHeader";
// import { apiCall } from '../api_utils/apiCall'
import {  toast } from "react-toastify";

type Task = {
  id: string;
  dueDate: string;
  status: "Completed" | "Pending" | "In Progress";
  description: string;
};
let borderColor = "";
let cornerClass = "";


const TaskPage = () => {
//   const allTasks: Task[] = [
//     { id: "1", dueDate: new Date("2023-10-01"), status: "Completed", description: "This is a completed task description." },
//     { id: "2", dueDate: new Date("2023-10-02"), status: "Pending", description: "This is a pending task description." },
//     { id: "3", dueDate: new Date("2023-10-03"), status: "InProcess", description: "This is a task that is in process." },
//   ];

  const [tasks,setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    // Fetch tasks from the server

    console.log("Token : ",localStorage.getItem("token"));
    apiCall('http://localhost:8080/api/task/getTasks', 'POST', {'X-Authorization': `${localStorage.getItem("token")}`}, null).then((response) => {
      // const json = response;
      // setTasks(json[1]);
      console.log("Task : ",response.tasks);
      setTasks(response.tasks);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setUserPreferences(response.userPreferences);
      }
    });
  }, []);

  function completeTask(id: any) {
    alert("Task completed");
    console.log("Token : ",localStorage.getItem("token"));
    apiCall('http://localhost:8080/api/task/completeTask/'+id, 'POST', {'X-Authorization': `${localStorage.getItem("token")}`}, null).then(() => {

      apiCall('http://localhost:8080/api/task/getTasks', 'POST', {'X-Authorization': `${localStorage.getItem("token")}`}, null).then((response) => {
        if(response)
            setTasks(response.tasks);  
      });
    });
  }

  const [userPreferences, setUserPreferences] = useState(null);
console.log(userPreferences);
  const handleRegister = async () => {
    await apiCall(
          "http://localhost:8080/api/task/getTasks",
          "POST",
          {
            'X-Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
          null
        ).then((response) => {
          console.log("Response : ", response);
          if (response) {
            toast.success("Task added successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        });
  }
  console.log(handleRegister);
  

  const getStatusBadge = (status: "Completed" | "Pending" | "In Progress") => {
 

    switch (status) {
      case "Completed":
        borderColor = "2px solid green";
        cornerClass = "cornerGreen"; 
        return (
          <Badge color="green" className="mr-2">
            <MdCheckCircle /> Completed
          </Badge>
        );
      case "Pending":
        borderColor = "2px solid red";
        cornerClass = "cornerRed"; 
        return (
          <Badge style={{ backgroundColor: "red" }} className="mr-2">
            <MdPending /> Pending
          </Badge>
        );
      case "In Progress":
        borderColor = "2px solid yellow";
        cornerClass = "cornerYellow"; // Ensure this class exists in your CSS
        return (
          <Badge color="yellow" className="mr-2">
            <MdHourglassEmpty /> In Process
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Tasks</h1>
        <input type='hidden' value={cornerClass}/>
        <input type='hidden' value={borderColor}/>
      <div className="space-y-4">
        {tasks.map((task) => {
          const { id, dueDate, status, description } = task;
          let borderColor = "";
          let cornerClass = "";

          switch (status) {
            case "Completed":
              borderColor = "2px solid green";
              cornerClass = "cornerGreen";
              break;
            case "Pending":
              borderColor = "2px solid red";
              cornerClass = "cornerRed";
              break;
            case "In Progress":
              borderColor = "2px solid yellow";
              cornerClass = "cornerYellow";
              break;
          }

          const statusBadge = getStatusBadge(status);

          return (
            <Card
              key={id}
              className={`p-4 shadow-lg hover:shadow-xl transition-shadow ${cornerClass}`}
              style={{ borderLeft: borderColor }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {statusBadge}
                  <span className="font-semibold text-lg">{dueDate.split("T")[0]}</span>
                </div>
                <div>
                  {(!(status === "Completed"))&&(<button className="bg-green-700" onClick={() => completeTask(id)}>Complete</button>)}
                </div>
              </div>

              <div className="transition-all duration-300">
                <p className="text-sm mt-2">{description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TaskPage;
export function Task(props: { id: any,title:string,desc:string ,dueDate:string,completeTask:any }) {
    console.log("props",props);
    console.log("dueDate",props.dueDate);
    // const date = props.dueDate.split("T")[0];

    const [isFlipped, setIsFlipped] = useState(false);
    const [translateY, setTranslateY] = useState(0);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
        setTranslateY(isFlipped ? 0 : -160); // Example: Moves card down 150px
      };


  return (
    <div className="w-[350px] h-[152px] mb-2 overflow-hidden">
        <Card className="w-[350px] h-[152px] mb-2" style={{backgroundColor:"white"}}>
            <TaskHeader {...props} onTaskHandler={handleCardClick}/>

            <div className="flex justify-left items-top mt-[10px]">
                <Progress value={33} className="progress-bar w-[60%] ml-[12px] mb-[10px] mt-[10px]"><div
                className="h-full bg-blue-500"
                style={{ width: '50%' }}
                /></Progress>

                <Label className="mt-[3px] ml-[15%] hover-pointer" style={{color:"#1565C0"}} onClick={()=>props.completeTask(props.id)}>Complete</Label>
                <ArrowRight color="#1565C0" className="ml-[5px]"/> 
            </div>
            <div className="flex justify-left items-top mt-[5px]">
                {/* {isPaused ? (
                    <Play color="white" className="ml-[10px] mb-[5px] hover-pointer" onClick={()=>updatePause(false)}/> 
                ) : (
                    <Pause color="white" className="ml-[10px] mb-[5px] hover-pointer" onClick={()=>updatePause(true)}/>
                )} */}
                <Label className="ml-[20px] mb-[10px]" style={{color:"#A5A5A5 "}}>10</Label>
            </div>
        </Card>
        <Card className="w-[350px] h-[152px] mb-2 flex items-center justify-center rounded-md shadow-md transform rotate-y-180 backface-hidden" style={{backgroundColor:"white",
            transform: `translateY(${translateY}px)`,
            transition: "transform 0.5s ease",
        }} onMouseLeave={handleCardClick}>
          <p className="text-center px-4">{props.desc}</p>
        </Card>
    </div>
    
  )
    }
    async function apiCall(endpoint: string | URL | Request, method = "POST", headers = {}, payload = null) {
      console.log(payload);
        try {
          const response = await fetch(endpoint, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              ...headers,
            },
            body: method,
          });
      
          // Check if the response is successful
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          // Parse and return the JSON response
          return await response.json();
        } catch (error) {
          console.error("Error during API call:", error);
          throw error;
        }
      }
