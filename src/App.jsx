// App.jsx or wherever your routes are
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../src/components/Navbar/Navbar";
import ScrollToTop from "../src/components/Navbar/ScrollTop";
import Home from "../src/pages/Home/Home";
import About from "../src/pages/About/About";

import Services from "../src/pages/Services/Services";
import Contact from "../src/pages/Contact/Contact";
import ProductPage from "./pages/Projects/ProjectPage";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Admin/Login";
import SecretLoginRedirect from "./components/SecreteLoginRedirect";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Router>
      <SecretLoginRedirect />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<ProductPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin-login" element={<Login />} />
          <Route
            path="admin"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
