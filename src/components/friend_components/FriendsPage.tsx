// import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input"
import FriendList from "./FriendsList";

const FriendPage = () => {

  return (
    <Tabs defaultValue="Friends" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3 gap-1">
        <TabsTrigger value="Friends">Friends</TabsTrigger>
        <TabsTrigger value="Requests">Requests [1]</TabsTrigger>
        <TabsTrigger value="FindFriends">Find Friends</TabsTrigger>
      </TabsList>
      <TabsContent value="Friends">
        <Table>
          <TableBody>
          <TableRow>
                <TableCell colSpan={3}>
                    <Input type="text" placeholder="Search" onChange={()=>{alert("changed")}} />
                </TableCell>
            </TableRow>

            <FriendList data={{ name: "Amit Patil", imgUrl: "https://github.com/shadcn.png", btnName: "Remove", btnAction: "Remove" }} />

            <FriendList data={{ name: "Abhishek Bhande", imgUrl: "https://github.com/shadcn.png", btnName: "Remove", btnAction: "Remove" }} />
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="Requests">
        <Table>
          <TableBody>
              <FriendList data={{ name: "Mrudul Ahirraio", imgUrl: "https://github.com/shadcn.png", btnName: "Accept", btnAction: "Accept" }} />
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="FindFriends">
        <Table>
          <TableBody>
          <TableRow>
                <TableCell colSpan={3}>
                    <Input type="text" placeholder="Search" onChange={()=>{alert("changed")}} />
                </TableCell>
            </TableRow>

            <FriendList  data={{ name: "Kiran Gawali", imgUrl: "https://github.com/shadcn.png", btnName: "Send Request", btnAction: "Send Request" }}/>

            <FriendList  data={{ name: "Tanmay Shindkar", imgUrl: "https://github.com/shadcn.png", btnName: "Send Request", btnAction: "Send Request" }}/>
            
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
};

export default FriendPage;
