import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import NoPage from "./components/NoPage";
import Todo from "./components/Todo";
import Home from "./components/Home";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ProfileForm from './components/ProfileForm';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<LoginForm/>}/>
                <Route path="login" element={<LoginForm/>}/>
                <Route path="signup" element={<SignupForm/>}/>
                <Route path="home" element={<Home/>}>
                  <Route index element={<ProfileForm/>} />
                  <Route path="profile" element={<ProfileForm/>}></Route>
                  <Route path="todo" element={<Todo/>}></Route>
                  <Route path="*" element={<NoPage/>}/>
                </Route>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
    </Router>
  );
}

export default App;
