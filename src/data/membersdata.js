import { tokens } from "../theme";
import {db} from "../../config/firebase";
import { getDocs,collection } from "firebase/firestore";
import { useEffect } from 'react';




const [memberslist,setmemberslist]= useState([]);
const memberscollection = collection(db,"members");
useEffect(() =>{        
  const getmembers = async () =>{
      try{
      export const data = await getDocs(memberscollection);
        const filterdata = data.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id,
      })) 

      console.log({filterdata});
      setmemberslist(filterdata);
    }catch(err){
      console.error(err);}
    };
     getmembers()
    },[]);