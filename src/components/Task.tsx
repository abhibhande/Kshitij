import {
  Card,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowRight, BookmarkCheck, Pause, Play } from "lucide-react"
import './css/task.css'
import { Progress } from "./ui/progress"
import { useEffect, useState } from "react"


export function Task(props: { id: any,title:string,dueDate:string,completeTask:any }) {
    console.log("props",props);
    console.log("dueDate",props.dueDate);
    const date = props.dueDate.split(":")[0];
    // const storageKey = `lastClickTime-${props.id}`;
    // const [timeDifference, setTimeDifference] = useState<number | null>(null);
    // const [isPaused, setIsPaused] = useState(true);
    // const updatePause = (status?:any) =>{
    //     if(status){
    //         handleButtonClick();
    //     }
    //     setIsPaused(status);
    // }
    // useEffect(() => {
    //     const storedTime = localStorage.getItem(storageKey);
    //     if (storedTime) {
    //       const previousTime = parseInt(storedTime, 10);
    //       const difference = Date.now() - previousTime;
    //       setTimeDifference(difference);
    //       updatePause(false);
    //     }
    //   }, []); 

    
    
    //     const handleButtonClick = () => {
    //       const currentTime = Date.now(); // Current time in milliseconds
    //       const storageKey = `lastClickTime-${props.id}`; // Unique key for each button
      
    //       // Check if there's a previously stored time for this button
    //       const storedTime = localStorage.getItem(storageKey);
    //     console.log("storedTime",storedTime);
    //       if (storedTime) {
    //         const previousTime = parseInt(storedTime, 10);
    //         const difference = currentTime - previousTime; // Time difference in milliseconds
    //         setTimeDifference(difference);
      
    //         // Optionally: Log the time difference in seconds
    //         console.log(
    //           `Time difference for button ${props.id}: ${Math.floor(difference / 1000)} seconds`
    //         );
    //       } else {
    //         setTimeDifference(null);
    //       }
      
    //       // Store the current time in localStorage with the button's unique key
    //       localStorage.setItem(storageKey, currentTime.toString());
    //     };

  return (
    <Card className="w-[350px]" style={{backgroundColor:"white"}}>
        <div className="flex justify-left items-top">
            <BookmarkCheck size={65} color="#000" style={{margin:"2px", padding:"1px"}}/>
            <div style={{display:"block"}}>
                <Label className="mt-[3px] mr-[10px] mb-[5px] link hover-pointer hover-color-change" style={{color:"#878787"}}>#TestNo</Label>
                <Label className="task-header">
                    {(props.title.length>40)?(props.title.substring(0,40)+"..."):props.title}
                </Label>
                </div>
            <div style={{marginTop:"6px"}}>
                <CardTitle className="date-text">
                        {props.dueDate.split("/")[0]}
                </CardTitle>
                <label className="date-sm-text">{date.split("/")[1]+"/"+date.split("/")[2]}</label>
            </div>
        </div>
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
  )
    }
