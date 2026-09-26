import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ProductsPage from "./pages/Products/ProductsPage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import XvsPage from "./pages/Xvs/XvsPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import ScrollManager from "./components/ScrollManager";

function App() {
  return (
    <>
      {/* Scrolls to the top (or to a #section) whenever the page changes */}
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/xvs" element={<XvsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
