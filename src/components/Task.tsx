import { useState } from "react";
import { Badge } from "@/components/ui/badge"; // Placeholder for an icon component from ShadcnUI
import { Card } from "@/components/ui/card"; // Placeholder for flip animation component, replace with actual component
import { MdCheckCircle, MdPending, MdHourglassEmpty } from "react-icons/md"; // Use relevant icons
import "@/components/css/task.css"; // Ensure this file includes corner styling

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
