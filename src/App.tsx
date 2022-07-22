import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Pokemon from "./components/Pokemon";

const App = () => {  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<Pokemon />} />
      </Routes>
    </Router>
  );
};

export default App;
