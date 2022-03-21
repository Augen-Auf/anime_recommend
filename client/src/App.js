import Navbar from "./components/navbar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/app-router";
import {observer} from "mobx-react-lite";
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <BrowserRouter>
        <div className="min-w-screen min-h-screen bg-primary">
        <Navbar/>
            <div className="max-w-screen pt-12">
                <AppRouter/>
            </div>
        </div>
        <ToastContainer/>
    </BrowserRouter>
  );
}

export default observer(App);
