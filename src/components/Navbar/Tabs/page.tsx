
import Analytics from "@/components/Analytics/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function TopTabs() {
  return (
    <Tabs defaultValue="Task" className="w-[350px]">
      <TabsList className=" grid w-full grid-cols-3 gap-1 bg-gray-100 rounded-md">
        <TabsTrigger value="Task" className=" bg-gray-200">Tasks</TabsTrigger>
        <TabsTrigger value="Analytics" className="bg-gray-200">Analystics</TabsTrigger>
        <TabsTrigger value="Friends" className="bg-gray-200">Friends</TabsTrigger>
      </TabsList>
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
    </Tabs>

  );
}
