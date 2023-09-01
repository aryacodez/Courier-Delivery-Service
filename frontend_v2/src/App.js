import Signin from "./pages/Signin/signin";
import Signup from "./pages/Signup/signup";
import Order from "./pages/Order/order";
import Dashboard from "./pages/Dashboard/dashboard";
import History from "./pages/History/history";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        {/*Public Route*/}
        <Route exact path='/' element={<Signin />} />        
        <Route exact path='/signup' element={<Signup />} />        
        <Route exact path='/order' element={<Order />} />        
        <Route exact path='/dashboard' element={<Dashboard />} />        
        <Route exact path='/history' element={<History />} />        
      </Routes>
    </>
  );
}

export default App;
