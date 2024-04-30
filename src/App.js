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
import Line from "./scenes/line";
// import FAQ from "./scenes/faq";
/*
import Pie from "./scenes/pie";
import Geography from "./scenes/geography";
import Invoices from "./scenes/invoices";
import Calendar from "./scenes/calendar/calendar";
import Bar from "./scenes/bar";
*/

function removeQuotes(str) {
  if (str.length >= 2 && str[0] === '"' && str[str.length - 1] === '"') {
    return str.slice(1, -1); // Efficient removal using slicing
  }
  return str; // Return the original string if no quotes found
}


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  const {currentUser}=useContext(AuthContext);
  const{currentRole}=useContext(AuthContext);
 
  // Check if current location is not '/login' or user is authenticated
  //const currentUser = true/* Check if user is authenticated, e.g., using context, state, etc. */;
  const showSidebarAndTopbar = location.pathname !== '/login' ;

    const RequireAuth =({children})=>{
      return currentUser ? (children) : <Navigate to="/login"/>;
    }

    function AdminElement({children}){
      if (currentRole == "Admin") {return<>{children}</>; }else{
        return <div>you do not have access to this page </div>;
      }
    }
    function ManagerAdminElement({children}){
      if ((currentRole == "Admin") || (currentRole =="Manager")){return<>{children}</>; }else{
        return <div>you do not have access to this page </div>;
      }
    }

    console.log("from app currentUser ",currentUser);
    console.log("from app currentRole ",currentRole);

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
              <Route path="/team" element={<RequireAuth><ManagerAdminElement><Team /></ManagerAdminElement></RequireAuth>} />
              <Route path="/contacts" element={<RequireAuth><AdminElement><Contacts /></AdminElement></RequireAuth>} />
              <Route path="/form" element={<RequireAuth><ManagerAdminElement><Form /></ManagerAdminElement></RequireAuth>} />
              <Route path="/line" element={<RequireAuth><AdminElement><Line /></AdminElement></RequireAuth>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}




export default App;
