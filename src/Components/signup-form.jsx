import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { LucideLoader2, TriangleAlert } from "lucide-react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import SignupContext from "../Context/SignupContext.jsx"
export function SignupForm({
  className,
  ...props
}) {
  const {email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, username, setUsername, error, loading, handleSubmit} = useContext(SignupContext);
  const navigate = useNavigate();
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter your details to create a new account
          </CardDescription>
          {error && 
            <div className="flex flex-row">
              <TriangleAlert className="h-5 w-5" color="red"/>
              <h1 className="text-red-600">
                {error}
              </h1>
            </div>
          }
          {
            loading && 
            <div className="flex flex-row">
              <LucideLoader2 className="animate-spin"/>
              <h1>
                You will be redirected to Login page in few seconds
              </h1>
            </div>
          }
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} placeholder="Please enter a valid email" required  onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="username" value={username} placeholder="abc123" required onChange={(e)=>{setUsername(e.target.value)}}/>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" value={password} required onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmpassword" type="password" value={confirmPassword} required onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
              </div>
              <Button type="submit" className="w-full">
                Signup
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
               Already Have an account?{" "}
              <a onClick={()=>{navigate('/signin')}} className="underline underline-offset-4 hover:cursor-pointer">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}
