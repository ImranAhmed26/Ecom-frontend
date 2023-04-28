import Image from "next/image";
import Link from "next/link";

import Logo from "../../public/assets/logo-white.png";

const Footer = () => {
  return (
    <div className=" w-full text-[#e3e8e8] ">
      <div className="py-2 px-10 bg-[#4e37d2] flex items-center gap-4 h-20">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          {/* <Image src={Logo} width={50.0} height={58.6} alt={"logo"} /> */}
        </div>
        <h1 className="font-bold text-2xl text-center">Nexa Mart</h1>
      </div>
      <div className="bg-[#1c2431] w-full md:text-base text-xs font-medium text-left px-10 py-8 flex grid-cols-3 xl:grid-cols-5 justify-evenly">
        <div className="">
          <div>Social</div>
          <Link href="https://www.facebook.com/rmgstockdotcom">
            <a className="hover:text-[#130F49] transition-all duration-75">Facebook</a>
          </Link>
          <div>Twitter</div>
          <div>Instagram</div>
        </div>

        <div>
          <div>Claim Report</div>
          <div>FAQ & Helps</div>
          <div>Shipping & Delivery</div>
          <div>Return & Exchanges</div>
        </div>

        <div>
          <div>
            <Link href="/contact">
              <a className="hover:text-[#130F49] transition-all duration-75">Contact</a>
            </Link>
          </div>
          <div>About Us</div>
          <div>Career</div>
          <div>Customer Care</div>
        </div>
      </div>
      <div className="text-lg text-center bg-[#151b29] py-5">
        Copyright &#169; 2023 | Nexa Mart{" "}
      </div>
    </div>
  );
};

export default Footer;
