import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Add from "./components/Add";
import Edit from "./components/Edit";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/edit/:id" element={<Edit/>} />
        <Route path="/create" element={<Add />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
