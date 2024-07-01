import "./App.css";
import MyShoutOutsRoute from "./components/MyShoutOutsRoute";
import ShoutOutList from "./components/ShoutOutList";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShoutOutList />} />
        <Route path="/user/:name" element={<ShoutOutList />} />
        <Route path="/me" element={<MyShoutOutsRoute />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
