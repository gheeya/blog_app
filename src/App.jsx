import { Outlet } from "react-router-dom";
import { Header } from "./components/index";
import { Footer } from "./components/index.js";

function App() {
  return (
    <>
      <div>
        <Header />
        <div className="h-100">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
