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
import LoginContext from "../Context/LoginContext.jsx"
import { useNavigate } from "react-router-dom"
export function LoginForm({
  className,
  ...props
}) {
  const {email, password, setEmail, setPassword, loading, error, handleSubmit} = useContext(LoginContext);
  const navigate = useNavigate();
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          {error && 
            <div className="flex flex-row">
              <TriangleAlert className="h-5 w-5" color="red"/>
              <h1 className="text-red-600">
                The email or password is incorrect
              </h1>
            </div>
          }
          {
            loading && 
            <div className="flex flex-row">
              <LucideLoader2 className="animate-spin"/>
              <h1>
                You will be redirected to homepage in few seconds
              </h1>
            </div>
          }
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} placeholder="m@example.com" required  onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    onClick={()=>(navigate('/forgotpassword'))}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline hover:cursor-pointer">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" value={password} required onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a onClick={()=>{navigate('/signup')}} className="underline underline-offset-4 hover:cursor-pointer">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}
