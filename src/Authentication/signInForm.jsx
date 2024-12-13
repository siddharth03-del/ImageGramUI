import {  useState } from 'react';
import { userSingIn } from '../Services/userSignIn';
import { storeToken } from '../Helpers/storeToken';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../Helpers/storeToken';
import { Spinner } from '@material-tailwind/react';
const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    setLoading(true);
    const token = await userSingIn(email, password);
    if(token){
      storeToken(email, token);
      setCurrentUser(email);
      setEmail('');
      setPassword('');
      setLoading(false);
      navigate('/homepage/posts');
    }
    else{
      setLoading(false);
    }
  };
  // const mutation = useMutation({
  //   mutationFn : (data)=>{
  //     return userSingIn(data.email, data.password)
  //   },
  //   retry : 3
  // })
  // useEffect(()=>{
  //   if(mutation.data){
  //     storeToken(email, mutation.data);
  //     setCurrentUser(email);
  //     setEmail(' ');
  //     setPassword(' ');
  //     setLoading(false);
  //     navigate('/homepage/posts');
  //   }
  // },[mutation.data])
  return (
    <>
    {!isLoading && <div className='w-full h-full flex flex-col justify-around mt-10'>
      <div className='w-1/2 mx-auto'>
      <form onSubmit={handleSubmit} >
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        </label>
        
        <label className="input input-bordered flex items-center gap-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input type="password" className="grow" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password'/>
        </label>
      <button type="submit" className='btn mt-10'>Sign In</button>
      </form>
      <div className='mt-3 flex flex-row justify-between'>
        <h1 className=''>Don&#39;t have an account? <a className='link link-info' onClick={()=>{navigate('/signup')}}>Sign Up</a></h1>
        <h1 className='link link-info ' onClick={()=>{navigate('/forgotpassword')}}>Forgot Password?</h1>
      </div>
      </div>
    </div>}
    <div>
      {isLoading && <div className='w-full h-[calc(100vh-5rem)]'>
        <div className='h-fit w-fit mx-auto'>
          <Spinner className='w-20 h-20'/>
        </div>
      </div>}
    </div>
    </>
  );
};

export default SignInForm;
