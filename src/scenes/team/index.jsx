import {useState,useEffect} from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import {db} from "../../config/firebase";
import{getDocs,collection,query, where,onSnapshot} from "firebase/firestore";
// import 'firebase/firestore';
// import firebase from 'firebase/app';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [subjects, setSubjects] = useState([]);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  };
  
useEffect( ()=> {

  const getmembers = async () =>{ 
    try{

      
      const q = query(collection(db, "members"));
      const querySnapshot = await getDocs(q);
      const unsubscribe =onSnapshot (q,(querySnapshot)=>{
        const data=[ ];
    
        querySnapshot.forEach((doc) => {
                // console.log ("1)Data: ",data);
                // doc.data() is never undefined for query doc snapshots
                //console log data
                // console.log("||id : ",doc.data().id," => name : ", doc.data().name," || access: ",doc.data().access," || phone : ",doc.data().phone);
                const newd={
                  ...doc.data(),
                  age: calculateAge(doc.data().DateBirth)
                };
                data.push(newd);
                
                //console.log("name :", doc.data().FirstName,"age : ",calculateAge(doc.data().DateBirth));
                
                console.log(doc.data());
                
        });

        setSubjects(data); 
       
      });

      return () => {
          unsubscribe(); // Unsubscribe from snapshot listener when component unmounts
        };

    }catch(error){
      console.log('erroe fetching data',error);
    }
  }

  getmembers();

},[]);

 


  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "FirstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "LastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>


          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Members" subtitle="Managing the Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={subjects} columns={columns}  components={{ Toolbar: GridToolbar }}/>
        
      </Box>
    </Box>
  );
};

export default Team;
