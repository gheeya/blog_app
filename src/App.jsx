import { Outlet } from "react-router-dom";
import { Header } from "./components/index";

function App() {
  return (
    <>
      <div>
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
