import {
  Card,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowRight, BookmarkCheck } from "lucide-react"
import './css/task.css'
import { Progress } from "./ui/progress"
import { useEffect, useState } from "react"
import TaskHeader from "./TaskHeader"


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
