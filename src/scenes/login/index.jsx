import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {db} from "../../config/firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';
import {database} from "../../config/realtime";
import {ref, set,update , limitToLast, orderByKey,push, get,orderByChild } from 'firebase/database';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Shilde.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//-----------------------function add 1 TO  A STRING  :

        // function incrementStringNumber(str) {
        //   // Split the string into non-numeric and numeric parts
        //   const keyParts = str.match(/(\D+)(\d+)/);

        //   if (keyParts) {
        //     const prefix = keyParts[1]; // Get the non-numeric part
        //     let numberPart = parseInt(keyParts[2]); // Get the numeric part and convert it to a number
        //     numberPart++; // Increment the numeric part
        //     return prefix + numberPart+'_'; // Concatenate the parts to form the new string
        //   } else {
        //     // If the string doesn't contain a numeric part, return the original string
        //     return str;
        //   }
        // }

//        -------------------- END FUNCTION--------------------

 //-----------------------functoin if exist
 const checkUsernameAvailability = async (username,password) => {
    const usersRef = collection(db, 'members');
    const q = query(usersRef, where('UserName', '==', username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Username exists, check if the password matches
      const userDoc = querySnapshot.docs[0]; 
      const userData = userDoc.data();
      console.log("u type ",password);
      console.log("Databasepassword",userData.Password);
      return userData.Password === password;
    } else {
      // Username doesn't exist
      return false;
    //return !querySnapshot.empty; // True if username doesn't exist, false otherwise
  };
}

//------------------------------END IF EXIST -----------------

//-----------------------FUNCTION GET ACCESS ---------------------
const getaccess = async (username) => {
    const usersRef = collection(db, 'members');
    const q = query(usersRef, where('UserName', '==', username));
    const querySnapshot = await getDocs(q);

      const userDoc = querySnapshot.docs[0]; 
      const userData = userDoc.data();
      return userData.access ;

}
//----------------------END GET ACCESS-------------------------------

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Login() {


  const [error, setError]=React.useState(false);

  const navigate = useNavigate();

  const {dispatch}=React.useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    

    const username = data.get('username');
    const password = data.get('password');
    // console.log({
    //   username: data.get('username'),
    //   password: data.get('password'),
    // });

  //  // Simulate login success (you can replace this with your actual login logic)
  //   const isLoginSuccess = true;

  //   if (isLoginSuccess) {
  //     // Redirect to the desired page after successful login
  //     dispatch({type:"LOGIN" , payload:username});
  //     navigate("/");
  //   } else {
  //     // Handle login failure (show error message, etc.)
  //     setError(true);
  //   }
    console.log("the username u type : ",username);
    console.log("the username u type : ",password);
    // Create a new Date object
    const currentTime = new Date();
    
  // Get the individual components of the date and time
  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
  const day = String(currentTime.getDate()).padStart(2, '0');
  const hours = String(currentTime.getHours()).padStart(2, '0');
  const minutes = String(currentTime.getMinutes()).padStart(2, '0');
  const seconds = String(currentTime.getSeconds()).padStart(2, '0');

  // Format the date-time string
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  //----------------------function for last node with number ------------------
    // const nodesRef = ref(database, 'members state/Data/'+username);
    // const lastNodeQuery = query(nodesRef, orderByKey(), limitToLast(1));
    //         async function incrementLastNode() {
    //           try {
    //             // Get the snapshot of the last node
    //             const lastNodeSnapshot = await get(lastNodeQuery);
    //             // Get the key (name) of the last node
    //             const lastNodeKey = Object.keys(lastNodeSnapshot.val())[0];
    //             console.log("last node before incrimenting ",lastNodeKey);
    //             //console.log(typeof lastNodeKey);
    //             //console.log(incrementStringNumber(lastNodeKey));
    //             console.log("Last node value incremented successfully!");
    //             console.log("after incrimenting :  ",incrementStringNumber(lastNodeKey));
    //             return incrementStringNumber(lastNodeKey);
    //           } catch (error) {

    //             console.error("Error incrementing last node value: ", error);
    //             return "login_0_";
    //           }
    //         }
//---------------------------end function---------------------- 
   
 try {
  const usernameAvailable = await checkUsernameAvailability(username,password);
  if (usernameAvailable) {
    console.log("Document exist ");

    // send user active to realtime database 
        try{

          //const loginnb= await incrementLastNode();
          //console.log("------>",loginnb);

          update(ref(database, 'members state/State/'+username),{Online:true });
          update(push(ref(database, 'members state/Data/' +username+"/")),{
            "time enter" :formattedDateTime,
          });
         console.log("data send .....");
         
        }catch(error){console.log(error);}
      const Role =await getaccess(username); // try to get the role from database Firestore
    dispatch({type:"LOGIN" , payload:{currentUser :username ,currentRole: Role}});
    navigate("/");

  } else {
    console.log("Document dosen t exist");
    setError(true);
  }
  } catch (error) {
    console.error('Error checking username:', error);
    // Handle error (set error state, show error message, etc.)
    setError(true);
  }

    
   
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
export default Login;