import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/" element={<Login/>}/>
            </Routes>
    </Router>
  );
}

export default App;
