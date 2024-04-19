import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
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
    <Box m="20px"  
    >
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
       borderRadius="30px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          borderRadius="30px"
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1"
            subtitle="temperature"
            progress="0.75"
            increase="+14%"
            icon={
              
              <DeviceThermostatIcon
                sx={{ fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          borderRadius="30px"
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
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
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color:"black", fontSize: "26px" }}
              />
            }
          />
        </Box>
       

        {/* ROW 2 */}
        <Box
       borderRadius="30px"
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
        >
      <Box
       borderRadius="30px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >




        <Box
        borderRadius="30px"
          gridColumn="span "
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1"
            subtitle="temperature"
            progress="0.75"
            increase="+14%"
            icon={
              
              <DeviceThermostatIcon
                sx={{  fontSize: "26px" }}
              />
            }
          />
        </Box>
        </Box>
        </Box>
        <Box
        borderRadius="30px"
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
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
      gridColumn="span 3"
      gridRow="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1"
            subtitle="temperature"
          
            progress="0.75"
            increase="+14%"
            icon={
              
              <DeviceThermostatIcon
                sx={{fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>

    </Box>
  );
};

export default Dashboard;
