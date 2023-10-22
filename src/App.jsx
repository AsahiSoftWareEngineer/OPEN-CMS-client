import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import './App.css'
import { AppView } from "./page/app";
import { LoginView } from "./page/login";

function App() {

  return (
    <>
      <div className="app">
        <Router>
          <Routes>
            <Route exact path="/*" element={<><AppView/></>}/>
            <Route exact path="/login" element={<><LoginView/></>}/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
