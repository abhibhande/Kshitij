import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {  UserMinus, UserPlus } from "lucide-react";

type Friend = {
  id: string;
  name: string;
  imgUrl: string;
  btnAction: "Follow" | "Unfollow";
};

const FriendList = ({
  data,
  onAction,
}: {
  data: Friend;
  onAction: (id: string, action: "Follow" | "Unfollow") => void; // Restrict to specific actions
}) => {
  // Map action to specific icons
  const getIcon = (action: "Follow" | "Unfollow") => {
    switch (action) {
      case "Follow":
        return <UserPlus />;
      case "Unfollow":
        return <UserMinus />;
      default:
        return null;
    }
  };

  return (
    <TableRow className="rounded-sm hover:bg-gray-300 border-b border-gray-300">
      <TableCell>
        <Avatar>
          <AvatarImage src={data.imgUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="cursor-pointer text-center font-semibold text-sm">
        {data.name}
      </TableCell>
      <TableCell className="flex justify-center">
        <Button
          className="rounded-md p-2"
          onClick={() => onAction(data.id, data.btnAction)} // Pass ID and action type to parent handler
        >
          {getIcon(data.btnAction)}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default FriendList;
