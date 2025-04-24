// App.jsx or wherever your routes are
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Navbar/Navbar";
import ScrollToTop from "../src/components/Navbar/ScrollTop";
import Home from "../src/pages/Home/Home";
import About from "../src/pages/About/About";

import Services from "../src/pages/Services/Services";
import Projects from "../src/pages/Projects/Project";
import Contact from "../src/pages/Contact/Contact";
import ProductPage from "./pages/Projects/ProjectPage";

function App() {
  return (
    <ProductPage />

    // <Router>
    //   <ScrollToTop />
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route index element={<Home />} />
    //       <Route path="/about" element={<About />} />
    //       <Route path="/services" element={<Services />} />
    //       <Route path="/projects" element={<Projects />} />
    //       <Route path="/contact" element={<Contact />} />
    //     </Route>
    //   </Routes>
    // </Router>
  );
}

export default App;
