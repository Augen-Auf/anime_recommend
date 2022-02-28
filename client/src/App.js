import Navbar from "./components/navbar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/app-router";
import {observer} from "mobx-react-lite";


function App() {

  return (
    <BrowserRouter>
        <Navbar/>
        <div className="max-w-screen mt-12">
            <AppRouter/>
        </div>
    </BrowserRouter>
  );
}

export default observer(App);
