import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

import { HumidityIcon } from '@hugeicons/react-pro';
    
  
import WaterIcon from '@mui/icons-material/Water';
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import GasMeterIcon from '@mui/icons-material/GasMeter';
import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
// import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import { red } from "@mui/material/colors";
<link id="happy" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /> 

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
  
        <Box>
          <Button
            sx={{
              backgroundColor: colors.grey[700],
              color: "black",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
  
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* First Row */}
        <Box
          borderRadius="30px"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gridColumn="span 1"
        >
              <StatBox
            
            subtitle="Temperature"
            progress="0.75"
            increase="+14%"
            icon={
              
              <DeviceThermostatIcon
                sx={{ fontSize: "26px" }}
              />
            }
          />
          {/* Your content for the first box */}
        </Box>
        
        <Box
          borderRadius="30px"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gridColumn="span 1"
        >
          {/* Your content for the second box */}
          <StatBox
            title="431,225"
            subtitle="Fire "
            progress="0.50"
            increase="+21%"
            icon={
              <FireplaceIcon
                sx={{ fontSize: "26px" }}
              />
            }
          />
        </Box>
        
        <Box
          borderRadius="30px"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gridColumn="span 1"
        >
          {/* Your content for the third box */}
          <StatBox
            title="11111"
            subtitle="New Member"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color:"black", fontSize: "26px" }}
              />
            }
          />
        </Box>
  
        {/* Second Row */}
        <Box
          borderRadius="30px"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gridColumn="span 1"
          height="140px" 
          width="400px"  
        >
          <StatBox
            title="55"
            subtitle="Humidité"
            progress="0.75"
            increase="+14%"
            icon={
              <WaterIcon sx={{ color: "white", fontSize: "26px" }} />
            }
          />
      
          {/* Your content for the seventh box */}
        </Box>
  




        <Box
          borderRadius="30px"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gridColumn="span 1"
          height="280px" 
          width="400px"  
        >
<Box>
  {/* Première ligne */}
  <Box>
    <StatBox 
      title="gaz"
      subtitle="le gaz est ....."
      progress={0.5}
      increase="+10%"
      icon={
        <GasMeterIcon
          sx={{ color:"black", fontSize: "26px" }}
        />
      }
  
    />
  </Box>
  {/* Deuxième ligne */}
  <Box>
    <StatBox 
      title="Fire"
      subtitle="le fire est .........."
      progress={0.8}
      increase="+20%"
      icon={
        <FireplaceIcon
          sx={{ color:"black", fontSize: "26px" }}
        />
      }
    />
  </Box>
</Box>


          {/* Your content for the sixth box */}
        </Box>
  



        <Box
          borderRadius="30px"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gridColumn="span 1"
          height="280px" 
          width="400px"  
        >
                    <StatBox
            title="11111"
            subtitle="door"
            progress="0.30"
            increase="+5%"
            icon={
              <RoomPreferencesIcon
                sx={{ color:"white", fontSize: "26px" }}
              />
            }
          />
      
          {/* Your content for the fifth box */}
          
        </Box>
  
        {/* Third Row */}
        <Box
          borderRadius="30px"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          gridColumn="span 1"
        >
           <StatBox
            title="11111"
            subtitle="les lampe"
            progress="0.30"
            increase="+5%"
            icon={
              < TipsAndUpdatesIcon
                sx={{ color:"black", fontSize: "26px" }}
              />
            }
          />
          {/* Your content for the fourth box */}
        </Box>
      </Box>
    </Box>
  );



};
export default Dashboard;
