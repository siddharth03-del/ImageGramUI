import { Button } from "@material-tailwind/react";
import { DeleteAccountDialog } from "./DeleteAccountConfirmDialog";
import { useState } from "react";
function Settings(){
    const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
    return(
        <div className="w-full h-full">
            <div className="w-11/12 h-fit flex flex-row ml-5 justify-between border-2 px-3 py-4 border-solid border-black rounded-xl">
                <h1 className="text-center font-bold text-xl">
                    Delete user account
                </h1>
                <Button color="red" onClick={()=>{setOpenDeleteAccount(true)}}>Delete</Button>
            </div>
            <DeleteAccountDialog open={openDeleteAccount} setOpen={setOpenDeleteAccount}/>
        </div>
    )
}
export default Settings;