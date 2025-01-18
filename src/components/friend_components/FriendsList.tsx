import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Check, Trash2, UserPlus } from "lucide-react";

type Friend = {
  id: string;
  name: string;
  imgUrl: string;
  btnAction: "Remove" | "Accept" | "Request";
};

const FriendList = ({
  data,
  onAction,
}: {
  data: Friend;
  onAction: (id: string, action: "Remove" | "Accept" | "Request") => void; // Restrict to specific actions
}) => {
  // Map action to specific icons
  const getIcon = (action: "Remove" | "Accept" | "Request") => {
    switch (action) {
      case "Remove":
        return <Trash2 />;
      case "Accept":
        return <Check />;
      case "Request":
        return <UserPlus />;
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
