import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Signup from "./components/Signup";
import NoPage from "./components/NoPage";
import Profile from "./components/Profile";
import Todo from "./components/Todo";
import Home from "./components/Home";

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="login" element={<Login/>}/>
                <Route path="signup" element={<Signup/>}/>
                <Route path="home" element={<Home/>}>
                  <Route index element={<Profile/>} />
                  <Route path="profile" element={<Profile/>}></Route>
                  <Route path="todo" element={<Todo/>}></Route>
                  <Route path="*" element={<NoPage/>}/>
                </Route>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
    </Router>
  );
}

export default App;
