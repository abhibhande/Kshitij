import {
    // Card,
    CardTitle,
  } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
  import {  BookmarkCheck} from "lucide-react"
  import './css/task.css'

const TaskHeader = (props: { id: any,title:string,dueDate:string,completeTask:any ,onTaskHandler: () => void},
)=>{

    console.log("Props Title:",props.title);
    const date = props.dueDate.split(":")[0];
    return(
        <div className="flex justify-left items-top">
            <BookmarkCheck size={65} color="#000" style={{margin:"2px", padding:"1px"}}/>
            <div style={{display:"block"}}>
                <Label className="mt-[3px] mr-[10px] mb-[5px] link hover-pointer hover-color-change" style={{color:"#878787"}} onClick={props.onTaskHandler}>#TestNo</Label>
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
    );
}

export default TaskHeader;