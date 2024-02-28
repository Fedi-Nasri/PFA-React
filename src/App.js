import { ColorModeContext,useMode } from "./theme";
import { CssBaseline,ThemeProvider } from "@mui/material";
import Sidebar from "./scenes/gloabl/Sidebar";
import Topbar from "./scenes/gloabl/Topbar";
import  Dashboard  from "./scenes/dashboard";

import {Routes,Route} from "react-router-dom";




function App() {
  const [theme,colorMode]=useMode();
 

  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="app">
     <Sidebar />
        <main className="content">
          <Topbar/> 
          
          <Routes>
              {/*<Route path="/" element={<Dashboard />}/>*/}


          </Routes>
        </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
