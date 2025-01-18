
import { Link } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import TopTabs from "./Tabs/page";


export default function Navbar(){
    return(
        <div className="flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-5 md:space-y-0 md:space-x-5">
          <div className="inline-block mr-5 mt-5">
            <h2 className="text-xl font-bold tracking-tight ">Hey Buddy!!!</h2>
          </div>
          <div className="inline-block flex items-center space-x-2">
            <Button variant="secondary" className="mr-2">+ Add</Button>
            <Button variant="secondary">
              <Link size={24} />
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Separator />
        </div>
        <TopTabs/>
      </div>
    );
}
