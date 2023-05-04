import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../context/authContext.js";
import { CartProvider } from "../context/cartContext.js";
import Footer from "../components/common/footer";
import Navbar from "../components/common/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </CartProvider>
      </AuthProvider>
      <ToastContainer
        autoClose={4000}
        hideProgressBar={true}
        theme={"colored"}
        style={{ width: "300px", paddingTop: "50px", paddingRight: "50px", fontSize: "1.05rem" }}
      />
    </>
  );
}

export default MyApp;
