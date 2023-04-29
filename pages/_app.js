import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../context/authContext.js";
import { cartProvider } from "../context/cartContext.js";
import Footer from "../components/common/footer";
import Navbar from "../components/common/navbar";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <cartProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </cartProvider>
    </AuthProvider>
  );
}

export default MyApp;
