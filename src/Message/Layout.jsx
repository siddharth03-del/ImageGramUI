import { Outlet } from "react-router-dom";

function Layout(){
    return(
        <div className="w-full">
            <Outlet/>
        </div>
    )
}
export default Layout;