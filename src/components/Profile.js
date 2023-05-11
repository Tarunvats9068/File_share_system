import React,{useState,useEffect} from "react";
import axios from "axios" 


const Profile =  () =>
{ 
    const [user,setuser] = useState(""); 
const fun = async () => {
    let ur = await axios("http://localhost:3000/api/user/profile")
    let data = localStorage.getItem("token");
    setuser(data);
     console.log(ur); 
}
useEffect(()=>{
    fun();
},[]);
        return (
             <h1> 
                {
                    user.length > 0 ? user.username : <p> Loding... </p>  
                }
             </h1>
      );
};
export default Profile;