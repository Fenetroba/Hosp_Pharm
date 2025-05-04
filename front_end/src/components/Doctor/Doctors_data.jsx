import React, { useState } from "react";
import CRUD_prescription from "./Creating_prescription";
import Sider from "./Sider";
import profilechange from "../../assets/profilechange.jpg";
import CRUD_Functions from "./CRUD_Functions";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser } from "@/store/UserData__slice";
import Loading from "../ui/loading/Loading";

const CRUD = ({ user }) => {
  const {loading}=useSelector(state=>state.user)
  const dispatch = useDispatch();
  const [userUpdate, setUserUpdate] = useState({
    name: "",
    email: "",
    oldPassword: '',
    newPassword: "",
  });
  const updateHandler = () => {
    dispatch(UpdateUser({ userId: user?._id, userData: userUpdate }))
      .then(data => {
        if(data.error?.message==="Rejected"){
          toast.success(data.payload.message);
        }else{
          toast.success("User updated SuccussFull!",data.payload.message);

        }
        console.log(data.payload.message);
      })
      .catch(error => {
        toast.error("Error updating user: " + error.message);
        console.error("Error updating user:", error);
      });
  
    setUserUpdate({
      name: "",
      email: "",
      oldPassword: '',
      newPassword: "",
    });
  };

  return (
    <div className="relative">
      <Toaster/>
      <Sider />

      <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-auto gap-2 mt-4 md:mt-10 ml-12 mr-2">
        <div className="col-span-1 md:col-span-3 row-span-5 bg-[var(--one)]">
          <div className="flex max-md:flex-col pb-30">
            <div className="text-white pt-3 px-6 max-w-[500px]">
              <h1 className="text-2xl">Update your Profile</h1>
              <label className="mt-7">Change your Name</label>
              <input 
                type="text" 
                placeholder="Your name" 
                className="mb-7" 
                onChange={e => setUserUpdate({ ...userUpdate, name: e.target.value })} 
                value={userUpdate.name} 
              />
              
              <label>Email</label>
              <input 
                type="email" 
                placeholder="email" 
                className="mb-7"  
                onChange={e => setUserUpdate({ ...userUpdate, email: e.target.value })}  
                value={userUpdate.email} 
              />

              <label>Insert your Old Password</label>
              <input
                type="password"
                placeholder="..................."
                className="mb-7"
                onChange={e => setUserUpdate({ ...userUpdate, oldPassword: e.target.value })}
                value={userUpdate.oldPassword}
              />

              <label>Insert your New Password</label>
              <input
                type="password"
                placeholder="..................."
                className="mb-7"
                onChange={e => setUserUpdate({ ...userUpdate, newPassword: e.target.value })}
                value={userUpdate.newPassword}
              />
              <Button 
                className="bg-[var(--six)] py-1 w-50 text-[var(--one)] hover:bg-blue-100 hover:text-black hover:border-2 cursor-pointer" 
                onClick={updateHandler}
              >
                {loading?<Loading className="text-white"/>:"Confirm"}
               
              </Button>
            </div>
            <div>
              <img
                src={profilechange}
                alt="profile change"
                className="w-90 p-2 max-md:w-full"
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 md:col-start-4 row-span-4 bg-[var(--one)] text-white">
          <h1 className="text-2xl text-center mt-3">Your Information</h1>
          <div className="my-4">
            <HoverCard>
              <HoverCardTrigger className="text-black cursor-pointer hover:scale-102 bg-blue-200 px-12 py-1 mx-3 flex">
                <span>My Information</span>{" "}
                <ChevronDown className="text-black hover:rotate-180" />
              </HoverCardTrigger>
              <HoverCardContent className="w-full">
                <h1>
                  Name: <span>Dr: {user?.name || user?.username}</span>
                </h1>
                <h1>
                  Email: <span>{user?.email || user?.useremail}</span>
                </h1>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 md:col-start-4 row-start-5 bg-[var(--one)]">
          3
        </div>
      </div>
    </div>
  );
};

export default CRUD;