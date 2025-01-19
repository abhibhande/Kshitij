

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Label } from './components/ui/label'
import { Button } from './components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card'
import { Input } from './components/ui/input'
import { useState } from 'react'
import Navbar from './components/Navbar/page'
import { apiCall } from './api_utils/apiCall'
export default function App() {


  // const completeTask = useCallback(
  //   (id: number) => {
  //     updateData((prevTasks: any[]) => prevTasks.filter((task) => task.id !== id));
  //   },
  //   [updateData]
  // );

  // const [showNav, setShowNav] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
function handlelogin() {
  console.log("Email : ",email);
  apiCall('http://localhost:8080/api/users/login?email='+email+'&password='+password, 'POST', {}, {}).then((response) => {
      console.log("Response : ",response);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setUserPreferences(response.userPreferences);
      }
    });
}

function handleRegister() {
  console.log("Email : ",email);
  apiCall('http://localhost:8080/api/users/register', 'POST', {}, { name,email,password }).then((response) => {
      console.log("Response : ",response);
      if (response!=="SUCCESS") {
        alert("User already exists");
      }
    });
}

const handleInputChange = (e:any) => {
  setEmail(e.target.value); // Update the state with the input value
};


const handlePasswordChange = (e:any) => {
  setPassword(e.target.value); // Update the state with the input value
};

const handleNameChange = (e:any) => {
  setName(e.target.value); // Update the state with the input value
}

const [userPreferences, setUserPreferences] = useState(null);
console.log(userPreferences);
// ${localStorage.getItem("token")}

  return (
    <div className="App "> 
    {!localStorage.getItem("token")?(
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
               <Label htmlFor="name">Email</Label>
               <Input id="email" defaultValue="test@mail.com" value={email} onChange={handleInputChange}/>
             </div>
             <div className="space-y-1">
               <Label htmlFor="password">Password</Label>
               <Input id="password" type='password' defaultValue="@peduarte"value={password} onChange={handlePasswordChange} />
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
               <Input id="name" type="text" value={name} onChange={handleNameChange}/>
             </div>
             <div className="space-y-1">
               <Label htmlFor="mail">Mail-id</Label>
               <Input id="mail" type="mail" value={email} onChange={handleInputChange}/>
             </div>
             <div className="space-y-1">
               <Label htmlFor="password">Password</Label>
               <Input id="password" type="mail" value={password} onChange={handlePasswordChange}/>
             </div>
           </CardContent>
           <CardFooter>
             <Button onClick={handleRegister}>Register</Button>
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


