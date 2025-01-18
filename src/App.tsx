

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Label } from './components/ui/label'
import { Button } from './components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card'
import { Input } from './components/ui/input'
import { useState } from 'react'
import Navbar from './components/Navbar/page'
export default function App() {


  // const completeTask = useCallback(
  //   (id: number) => {
  //     updateData((prevTasks: any[]) => prevTasks.filter((task) => task.id !== id));
  //   },
  //   [updateData]
  // );

  const [showNav, setShowNav] = useState(false);
function handlelogin() {
    setShowNav(true);
}
  return (
    <div className="App "> 
    {!showNav?(
       <Tabs defaultValue="login" className="w-[400px] mt-5">
       <TabsList className="grid w-full grid-cols-2 gap-1  bg-gray-100 rounded-md">
         <TabsTrigger value="login" className=' bg-gray-200'>Login</TabsTrigger>
         <TabsTrigger value="register"  className=' bg-gray-200'>Register</TabsTrigger>
       </TabsList>
       <TabsContent value="login">
         <Card>
           <CardHeader>
             <CardTitle>Login</CardTitle>
             <CardDescription>
               Make changes to your account here. Click save when you're done.
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-2">
             <div className="space-y-1">
               <Label htmlFor="name">Name</Label>
               <Input id="name" defaultValue="Pedro Duarte" />
             </div>
             <div className="space-y-1">
               <Label htmlFor="password">Password</Label>
               <Input id="password" type='password' defaultValue="@peduarte" />
             </div>
           </CardContent>
           <CardFooter>
             <Button onClick={handlelogin}>Login</Button>
           </CardFooter>
         </Card>
       </TabsContent>
       <TabsContent value="register">
         <Card>
           <CardHeader>
             <CardTitle>Register</CardTitle>
             <CardDescription>
               Register Yourself!!!
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-2">
             <div className="space-y-1">
               <Label htmlFor="name">Name </Label>
               <Input id="name" type="text" />
             </div>
             <div className="space-y-1">
               <Label htmlFor="mail">Mail-id</Label>
               <Input id="mail" type="mail" />
             </div>
             <div className="space-y-1">
               <Label htmlFor="password">Password</Label>
               <Input id="password" type="mail" />
             </div>
           </CardContent>
           <CardFooter>
             <Button >Register</Button>
           </CardFooter>
         </Card>
       </TabsContent>
     </Tabs>
    ):
    (<>
      <Navbar />
    </>)}
    </div>
  )
}
