import React, { useState,useEffect } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import WarningIcon from '@mui/icons-material/Warning';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import LightIcon from '@mui/icons-material/Light';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { database } from "../../config/realtime";
import { getDatabase, ref, onValue ,snapshot,set} from "firebase/database";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [doorSwitch, setDoorSwitch] = useState(false);
  const [lightSwitch, setLightSwitch] = useState(false);
  
  const [fireSec, setFireSec] = useState(false);
  const [Unkown, setUnkown] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [numP, setNumP] = useState(1);

  useEffect(() => {
    const doorSwitchRef = ref(database, 'update/doorSwitch');
    onValue(doorSwitchRef, (snapshot) => {
      const data = snapshot.val();
      setDoorSwitch(data);
    });
    const lightSwitchRef = ref(database, 'update/lightSwitch');
    onValue(lightSwitchRef, (snapshot) => {
      const datalight = snapshot.val();
      setLightSwitch(datalight);
    });

    const FireSecRef = ref(database, 'update/fire');
    onValue(FireSecRef, (snapshot) => {
      const securityfire = snapshot.val();
      setFireSec(securityfire);
    });

    const UnknownRef = ref(database, 'update/unknown');
    onValue(UnknownRef, (snapshot) => {
      const dataUnknown = snapshot.val();
      setUnkown(dataUnknown);
    });
    const numpRef = ref(database, 'update/people');
    onValue(numpRef, (snapshot) => {
      const datanumpRef = snapshot.val();
      setNumP(datanumpRef);
    });
    

    const dbRef = ref(database, "update/temperature"); // Replace with your actual path
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
         
          if (childKey =="temperature"){
      
            setTemperature(childData);
          }
        });
      },
      {
        onlyOnce: false,
      }
    );
        return () => unsubscribe();
  }, [temperature]);

  useEffect(() => {
    const dbRef = ref(database, "update/humidity"); // Replace with your actual path
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
         
          if (childKey =="humidity"){
      
            setHumidity(childData);
          }
        });
      },
      {
        onlyOnce: false,
      }
    );
        return () => unsubscribe();
  }, [humidity]);

  const handleDoorSwitchChange = (event) => {
    const isChecked = event.target.checked;
    setDoorSwitch(isChecked);
    set(ref(database, 'update/doorSwitch'), isChecked);
    console.log(`Door switch is ${isChecked ? 'ON' : 'OFF'}`);
  };

  const handleLightSwitchChange = (event) => {
    const isChecked = event.target.checked;
    setLightSwitch(isChecked);
    set(ref(database, 'update/lightSwitch'), isChecked);
    console.log(`Light switch is ${isChecked ? 'ON' : 'OFF'}`);
  };

  return (
    <Box m="20px"  
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
       borderRadius="30px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        
        {/* ROW 1 */}

        {/*  Temperature model */}
        <Box
      borderRadius="30px"
      gridColumn="span 3"
      backgroundColor={colors.primary[400]}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="16px"
      position="relative"
    >
      
      <Box display="flex" flexDirection="column" alignItems="center"  width="100%">
      <DeviceThermostatIcon style={{  fontSize: '40px' }} />
        <Typography variant="h1" align="center">{temperature}</Typography>
        <Typography variant="body1" style={{ color: '#06c4b6', marginTop: '5px' }}>
          Temperature
        </Typography>
      </Box>
    </Box>

    {/* END  Temperature model */}

    {/*  Humidity  model */}
            <Box
      borderRadius="30px"
      gridColumn="span 3"
      backgroundColor={colors.primary[400]}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="16px"
      position="relative"
    >
      
      <Box display="flex" flexDirection="column" alignItems="center"  width="100%">
        <WaterDropIcon style={{  fontSize: '40px' }} />
        <Typography variant="h1" align="center">{humidity}</Typography>
        <Typography variant="body1" style={{ color: '#06c4b6', marginTop: '5px' }}>
          Humidity
        </Typography>
      </Box>
    </Box>

    {/* END  Humidity model */}


       

        {/* ROW 2 */}
    
    {/* switches for door */}

    <Box
      borderRadius="30px"
      gridColumn="span 4"
      gridRow="span 1"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="16px"
    >
      <Box
        borderRadius="30px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding="10px"
        backgroundColor={colors.primary[400]}
      >
        <SensorDoorIcon style={{fontSize: '40px'}}/>
        
        <FormControlLabel
        
        control={<IOSSwitch sx={{ m: 1 }} checked={doorSwitch} onChange={handleDoorSwitchChange} />}
        label="Open / Close Door"
      />
      <Typography variant="body1" style={{ marginBottom: '8px', color: '#06c4b6' }}>
           Door controller
        </Typography>
      </Box>
    </Box>

    {/* END switches for door  */}

    {/* switches  light */}

    <Box
      borderRadius="30px"
      gridColumn="span 4"
      gridRow="span 1"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding="16px"
    >
      <Box
        borderRadius="30px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding="10px"
        backgroundColor={colors.primary[400]}
      >
        <LightIcon style={{fontSize: '40px'}}/>
        
        <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} checked={lightSwitch} onChange={handleLightSwitchChange} />}
        label="Lights"
      />
      <Typography variant="body1" style={{ marginBottom: '8px', color: '#06c4b6' }}>
           Light controller
        </Typography>
      </Box>
    </Box>

    {/* END switches  light */}

    {/*Number of People */}
        <Box
        borderRadius="30px"
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
           
        <Box display="flex" flexDirection="column" alignItems="center"  width="100%">
          <PeopleAltIcon style={{  fontSize: '40px' }} />
        <Typography variant="h1" align="center">{numP}</Typography>
        <Typography variant="body1" style={{ color: '#06c4b6', marginTop: '5px' }}>
          Number of People 
        </Typography>
      </Box>

      </Box>
      {/*End Number of Poeple */}

      {/* Start Warning Model */ }
      <Box
      borderRadius="30px"
      gridColumn="span 3"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      paddingTop="20px" // Adjust as needed
      paddingBottom="20px" // Adjust as needed
    >
      <Box display="flex" flexDirection="column" alignItems="center">


        <Box>
              {fireSec || Unkown ? (  
                <WarningIcon style={{ fontSize: '30px', color: 'red' }} />
              ) : (
                <GppGoodIcon style={{ fontSize: '30px', color: 'green' }} />  
              )}
            </Box>

        <Box display="flex" flexDirection="row" alignItems="center">

        <Typography variant="h4" style={{ marginBottom: '8px', marginTop: '20px' }}>
          Detection Fire              
        </Typography>
        
          {fireSec ? (
            <LocalFireDepartmentIcon style={{  fontSize: '30px' ,color: 'red',marginTop: '20px',marginLeft: '30px'}}/>
          ) : (
            <GppGoodIcon style={{ fontSize: '30px', color: 'green',marginTop: '20px',marginLeft: '30px' }} />
          )}
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">

        <Typography variant="h4" style={{ marginBottom: '8px', marginTop: '60px' }}>
          Unknown Person           
        </Typography>
        
        {Unkown  ? (
          <NoAccountsIcon style={{  fontSize: '30px' ,color: 'red',marginTop: '45px',marginLeft: '30px'}}/>
          
        ) : (
          <GppGoodIcon style={{ fontSize: '30px', color: 'green' ,marginTop: '45px',marginLeft: '30px'}} />
        )}
        </Box>

      </Box>
      
    </Box>
  
      {/* End Warning Model */ }
    </Box>
    
  </Box>
  );
};

export default Dashboard;
