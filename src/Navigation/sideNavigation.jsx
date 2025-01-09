import { useNavigate } from "react-router-dom";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    PlusIcon
  } from "@heroicons/react/24/solid";
import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import {MyContext} from '../context.js'
import LogoutDialog from "../Logout/logout.jsx";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/16/solid";
import HomeIcon from "../assets/HomeIcon.jsx";
  export function DefaultSidebar() {
    const navigate = useNavigate();
    const [openLogout, setLogout] = useState(false);
    return (
      <>
      <Card className="h-[calc(100vh-6rem)] w-full max-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="purple" className="italic">
            Imagegram
          </Typography>
        </div>
        <List>
          <ListItem onClick={()=>{navigate("/homepage/posts")}}>
            <ListItemPrefix>
              <HomeIcon/>
            </ListItemPrefix>
            Home
          </ListItem>
          <ListItem onClick={()=>{navigate("/homepage/explore")}}>
            <ListItemPrefix>
              <MagnifyingGlassCircleIcon className="h-5 w-5"/>
              {/* <ShoppingBagIcon className="h-5 w-5" /> */}
            </ListItemPrefix>
            Search
          </ListItem>
          <ListItem onClick={()=>{navigate("/homepage/message")}}>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip value="0" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
          </ListItem>
          <ListItem onClick={()=>{navigate("/homepage/upload")}}>
            <ListItemPrefix>
                <PlusIcon className="h-5 w-5"/>
            </ListItemPrefix>
            Upload Post
          </ListItem>
          <ListItem onClick={()=>{navigate("/homepage/profile")}}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem onClick={()=>{navigate("/homepage/settings")}}>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <MyContext.Provider value={{openLogout, setLogout}}>
            <ListItem onClick={()=>{setLogout(!openLogout)}}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
              <LogoutDialog/>
            </ListItem>
          </MyContext.Provider>
        </List>
      </Card>
      <Outlet/>
      </>
    );
  }