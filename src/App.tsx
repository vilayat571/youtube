import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watch from "./pages/Watch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/search"} element={<Search />} />
        <Route path={"/watch/:id"} element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
