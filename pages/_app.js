import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../context/authContext.js";
import { CartProvider } from "../context/cartContext.js";
import Footer from "../components/common/footer";
import Navbar from "../components/common/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
