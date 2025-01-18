"use server";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import FriendList from "./FriendsList";
import "@/App.css";
import { useState } from "react";

type Friend = {
  id: string;
  name: string;
  imgUrl: string;
  btnAction: "Remove" | "Accept" | "Request";
};

const FriendPage = () => {
  // Sample data with unique IDs
  const friends: Friend[] = [
    {
      id: "1",
      name: "Amit Patil",
      imgUrl: "https://github.com/shadcn.png",
      btnAction: "Remove",
    },
    {
      id: "2",
      name: "Abhishek Bhande",
      imgUrl: "https://github.com/shadcn.png",
      btnAction: "Remove",
    },
  ];

  const requests: Friend[] = [
    {
      id: "3",
      name: "Mrudul Ahirrao",
      imgUrl: "https://github.com/shadcn.png",
      btnAction: "Accept",
    },
  ];

  const findFriends: Friend[] = [
    {
      id: "4",
      name: "Kiran Gawali",
      imgUrl: "https://github.com/shadcn.png",
      btnAction: "Request",
    },
    {
      id: "5",
      name: "Tanmay Shindkar",
      imgUrl: "https://github.com/shadcn.png",
      btnAction: "Request",
    },
  ];

  // Handle button action based on unique ID and action type
  const handleAction = (
    id: string,
    action: "Remove" | "Accept" | "Request"
  ) => {
    console.log(`Action: ${action}, ID: ${id}`);
    alert(`Action: ${action}, ID: ${id}`);
  };

  // State for filtered data
  const [filteredFriends, setFilteredFriends] = useState(friends);
  const [filteredRequests, setFilteredRequests] = useState(requests);
  const [filteredFindFriends, setFilteredFindFriends] = useState(findFriends);

  // Handle search functionality
  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();

    // Filter friends
    const filteredFriendsList = friends.filter((friend) =>
      friend.name.toLowerCase().includes(lowercasedQuery)
    );

    // Filter requests
    const filteredRequestsList = requests.filter((request) =>
      request.name.toLowerCase().includes(lowercasedQuery)
    );

    // Filter find friends
    const filteredFindFriendsList = findFriends.filter((friend) =>
      friend.name.toLowerCase().includes(lowercasedQuery)
    );

    // Update state with filtered data
    setFilteredFriends(filteredFriendsList);
    setFilteredRequests(filteredRequestsList);
    setFilteredFindFriends(filteredFindFriendsList);
  };

  return (
    <Tabs defaultValue="Friends" className="w-[300px]">
      <TabsList className="grid w-full grid-cols-3 gap-1">
        <TabsTrigger value="Friends" className="bg-gray-200">
          Friends
        </TabsTrigger>
        <TabsTrigger value="Requests" className="bg-gray-200">
          Requests [{filteredRequests.length}]
        </TabsTrigger>
        <TabsTrigger value="FindFriends" className="bg-gray-200">
          Find Friends
        </TabsTrigger>
      </TabsList>

      <TabsContent value="Friends">
        <div className="h-[300px] overflow-y-auto no-horizontal-scroll custom-scrollbar">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>
                  <Input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              {filteredFriends.map((friend) => (
                <FriendList
                  key={friend.id}
                  data={friend}
                  onAction={handleAction}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="Requests">
        <div className="h-[300px] overflow-y-auto no-horizontal-scroll custom-scrollbar">
          <Table>
            <TableBody>
              {filteredRequests.map((request) => (
                <FriendList
                  key={request.id}
                  data={request}
                  onAction={handleAction}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="FindFriends">
        <div className="h-[300px] overflow-y-auto no-horizontal-scroll custom-scrollbar">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3}>
                  <Input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </TableCell>
              </TableRow>
              {filteredFindFriends.map((friend) => (
                <FriendList
                  key={friend.id}
                  data={friend}
                  onAction={handleAction}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FriendPage;
