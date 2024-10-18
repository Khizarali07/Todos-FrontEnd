import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/header.js";
import Main from "./component/main.js";
import Pending from "./component/pending.js";
import Complete from "./component/complete.js";
import Footer from "./component/footer.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="pending" element={<Pending />} />
          <Route path="complete" element={<Complete />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
