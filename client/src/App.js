import Navbar from "./components/navbar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/app-router";

function App() {

  return (
    <BrowserRouter>
        <Navbar/>
        <div className="w-screen mt-12">
            <AppRouter/>
        </div>
    </BrowserRouter>
  );
}

export default App;
