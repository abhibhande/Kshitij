
import { Badge } from "@/components/ui/badge"; // Placeholder for an icon component from ShadcnUI

import { MdCheckCircle, MdPending, MdHourglassEmpty } from "react-icons/md"; // Use relevant icons
import "@/components/css/task.css"; // Ensure this file includes corner styling
import {
  Card,
} from "@/components/ui/card"
import './css/task.css'
import {  useState } from "react"
import { Progress } from "@radix-ui/react-progress";
import { ArrowRight } from "lucide-react";
import { Label } from "recharts";
import TaskHeader from "./TaskHeader";

type Task = {
  id: string;
  date: Date;
  status: "Completed" | "Pending" | "InProcess";
  description: string;
};
let borderColor = "";
let cornerClass = "";


const TaskPage = () => {
  const allTasks: Task[] = [
    { id: "1", date: new Date("2023-10-01"), status: "Completed", description: "This is a completed task description." },
    { id: "2", date: new Date("2023-10-02"), status: "Pending", description: "This is a pending task description." },
    { id: "3", date: new Date("2023-10-03"), status: "InProcess", description: "This is a task that is in process." },
  ];

  const [tasks] = useState<Task[]>(allTasks);

  const getStatusBadge = (status: "Completed" | "Pending" | "InProcess") => {
 

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
      case "InProcess":
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
          const { id, date, status, description } = task;
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
            case "InProcess":
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
                  <span className="font-semibold text-lg">{date.toDateString()}</span>
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
    const date = props.dueDate.split(":")[0];

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
