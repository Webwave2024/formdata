import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./Form";
import Certificate from "./Certificate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/certificate" element={<Certificate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;