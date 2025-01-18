
import Analytics from "@/components/Analytics/page";
import Friends from "@/components/friend_components/page";
import { Task } from "@/components/Task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

const [data, updateData] = useState<any>([]);

  useEffect(() => {
    updateData([
      {
        id: 1,
        title: "Sample test note completion",
        dueDate: "10/01/2025:10:00",
        desc: "Complete the sample test note for review and submission."
      },
      {
        id: 2,
        title: "Big task completion pending",
        dueDate: "10/01/2025:10:00",
        desc: "Finish the major task that has been marked as pending for the project deadline."
      },
      {
        id: 3,
        title: "Sample test note completion",
        dueDate: "10/01/2025:10:00",
        desc: "Ensure the sample test note is fully prepared for presentation."
      }
    ]);
  }, []);

export default function TopTabs() {
  return (
    <Tabs defaultValue="Task" className="w-[350px]">
      <TabsList className=" grid w-full grid-cols-3 gap-1 bg-gray-100 rounded-md ">
        <TabsTrigger value="Task" className=" bg-gray-200">Tasks</TabsTrigger>
        <TabsTrigger value="Analytics" className="bg-gray-200">Analystics</TabsTrigger>
        <TabsTrigger value="Friends" className="bg-gray-200">Friends</TabsTrigger>
      </TabsList>
      <TabsContent value="Task">
        <Card>
            <CardHeader>
                <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
                <Task id={undefined} title={"abc"} dueDate={""} completeTask={undefined}/>
            </CardContent>
            </Card>
      </TabsContent>
      <TabsContent value="Analytics">
        <Card>
            <CardHeader>
                <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
                <Analytics />
            </CardContent>
            </Card>
      </TabsContent>
      <TabsContent value="Friends">
        <Card>
            <CardHeader>
                <CardTitle>Friends</CardTitle>
            </CardHeader>
            <CardContent>
                <Friends/>
            </CardContent>
            </Card>
      </TabsContent>
    </Tabs>

  );
}
