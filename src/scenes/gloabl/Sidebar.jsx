import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";


const Sidebar = () => {
   
return (
    <Box>
        <ProSidebar >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem> Documentation </MenuItem>
          
        </Menu>
      </ProSidebar>
    </Box>
    );
};



export default Sidebar;