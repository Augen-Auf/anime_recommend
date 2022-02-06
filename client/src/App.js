import Navbar from "./components/navbar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/app-router";

function App() {

  return (
    <BrowserRouter>
        <Navbar/>
        <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
