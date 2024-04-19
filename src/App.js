import { useContext, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import Login from "./scenes/login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { AuthContext } from './context/AuthContext';

// import FAQ from "./scenes/faq";
/*import Line from "./scenes/line";
import Pie from "./scenes/pie";
import Geography from "./scenes/geography";
import Invoices from "./scenes/invoices";
import Calendar from "./scenes/calendar/calendar";
import Bar from "./scenes/bar";
*/




function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const {currentUser}=useContext(AuthContext);

  // Check if current location is not '/login' or user is authenticated
  //const currentUser = true/* Check if user is authenticated, e.g., using context, state, etc. */;
  const showSidebarAndTopbar = location.pathname !== '/login' ;

    const RequireAuth =({children})=>{
      return currentUser ? (children) : <Navigate to="/login"/>;
    }
  
    //console.log(currentUser);

  return (

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        {showSidebarAndTopbar && <Sidebar isSidebar={isSidebar} />}
          {/* <Sidebar isSidebar={isSidebar} /> */}
          <main className="content">
          {showSidebarAndTopbar && <Topbar setIsSidebar={setIsSidebar} />}
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path="/team" element={<RequireAuth><Team /></RequireAuth>} />
              <Route path="/contacts" element={<RequireAuth><Contacts /></RequireAuth>} />
              <Route path="/form" element={<RequireAuth><Form /></RequireAuth>} />
              

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
