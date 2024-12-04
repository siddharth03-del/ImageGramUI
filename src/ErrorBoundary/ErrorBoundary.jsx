import image from '../assets/oops-something-went-wrong-error-page-concept-vector-illustration-114821176.webp' ;
import { Button } from '@material-tailwind/react';
function ErrorShow(){
    return(
        <div className='w-full h-full'>
            <div className='flex flex-col w-full h-full justify-center align-middle'>
                <div className='h-fit w-fit'>
                    <img src={image}alt='something went wrong'/>
                </div>
                <div className='mt-10 h-fit w-fit'>
                    <Button color='blue' onClick={()=>{window.location.reload()}}> Reload </Button>
                </div>
            </div>
        </div>
    )
}
export default ErrorShow;