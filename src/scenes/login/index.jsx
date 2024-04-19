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



 //functoin if exist
 const checkUsernameAvailability = async (username) => {
  const usersRef = collection(db, 'members');
  const q = query(usersRef, where('UserName', '==', username));
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty; // True if username doesn't exist, false otherwise
};


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
   
 try {
  const usernameAvailable = await checkUsernameAvailability(username);
  if (usernameAvailable) {
    console.log("Document exist ");
    dispatch({type:"LOGIN" , payload:username});
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