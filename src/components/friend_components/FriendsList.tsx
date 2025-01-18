import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import {
    TableCell,
    TableRow,
  } from "@/components/ui/table";


interface Friend {
  name: string;
  imgUrl: string;
   btnName: string;
   btnAction: string;
}

const FriendList =({data}: { data: Friend })=>{
    return (
    <TableRow className="rounded-sm hover:bg-gray-300 border-b border-gray-300">
        <TableCell>
          <Avatar>
            <AvatarImage src={data.imgUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </TableCell>
        <TableCell className="text-lg font-medium cursor-pointer">
          {data.name}
        </TableCell>
        <TableCell>
          <Button className="rounded-md" onClick={() => { data.btnAction }}>{data.btnName}</Button>
        </TableCell>
      </TableRow>
      )
}

export default FriendList;