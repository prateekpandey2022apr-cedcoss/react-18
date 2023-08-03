import TestUseTransition from "./Components/TestUseTransition";
import TestSuspence from "./Components/TestSuspence";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="transition" element={<TestUseTransition />}></Route>
      <Route path="suspense" element={<TestSuspence />}></Route>
    </Routes>
  );
}

export default App;
