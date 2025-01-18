import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody } from "@/components/ui/table";
import FriendList from "./FriendsList";
import "@/components/css/friends.css";

type Friend = {
  id: string;
  name: string;
  imgUrl: string;
  btnAction: "Follow" | "Unfollow";
};

const FriendPage = () => {
  // Sample data with unique IDs and "Follow" / "Unfollow" actions
  const allFriends: Friend[] = [
    { id: "1", name: "Amit Patil", imgUrl: "https://github.com/shadcn.png", btnAction: "Follow" },
    { id: "2", name: "Abhishek Bhande", imgUrl: "https://github.com/shadcn.png", btnAction: "Unfollow" },
    { id: "3", name: "Mrudul Ahirrao", imgUrl: "https://github.com/shadcn.png", btnAction: "Follow" },
    { id: "4", name: "Kiran Gawali", imgUrl: "https://github.com/shadcn.png", btnAction: "Follow" },
    { id: "5", name: "Tanmay Shindkar", imgUrl: "https://github.com/shadcn.png", btnAction: "Unfollow" },
  ];

  // Filters and selected data
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [filteredData, setFilteredData] = useState<Friend[]>(allFriends);

  // Handle filter selection
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);

    if (filter === "All") {
      setFilteredData(allFriends);
    } else if (filter === "Following") {
      setFilteredData(allFriends.filter((friend) => friend.btnAction === "Unfollow"));
    } else if (filter === "Not Following") {
      setFilteredData(allFriends.filter((friend) => friend.btnAction === "Follow"));
    }
  };

  return (
    <div className="p-4">
      {/* Horizontal Filters */}
      <div className="flex space-x-4 pb-4 overflow-x-auto hide-scrollbar sticky top-0 z-10 bg-white pt-4">
        {["All", "Following", "Not Following"].map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            className={`text-sm px-4 py-2 rounded-full border ${
              activeFilter === filter ? "bg-black text-white" : "bg-transparent border-gray-300"
            } `}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Filtered Data Display */}
      <div className="h-[300px] overflow-y-auto mt-4">
        <Table>
          <TableBody>
            {filteredData.map((friend) => (
              <FriendList
                key={friend.id}
                data={friend}
                onAction={(id, action) => console.log(`Action: ${action}, ID: ${id}`)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FriendPage;
