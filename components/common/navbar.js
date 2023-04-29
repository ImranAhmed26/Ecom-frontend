import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";

import { authContext } from "../../context/authContext";
import { CartContext } from "../../context/cartContext";
import LoginModal from "../modal/loginModal";
import Logo from "../../public/assets/logo.png";
import SearchBar from "./searchBar";
import ProfileModal from "../modal/profileModal";
import { ChevronDownIcon, ShoppingBagIcon } from "@heroicons/react/20/solid";
import CartViewModal from "../modal/cartViewModal";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(false);
  const [isCartVisible, setCartVisible] = useState(false);

  const { state } = useContext(authContext);
  const { cart } = useContext(CartContext);

  const router = useRouter();

  const handleShowModal = () => {
    setVisible(true);
  };

  const handleCartOpen = () => {
    setCartVisible(!isCartVisible);
  };

  return (
    <div className="z-30 top-0">
      <div className="w-full h-20 px-3 sm:px-4 lg:px-12 py-3.5 bg-white text-lg drop-shadow-md flex justify-between -center sticky  ">
        <div className="flex -center w-1/5 ">
          <div
            className="text-2xl font-bold cursor-pointer inline-flex items-end "
            onClick={() => {
              router.push("/");
            }}
          >
            <Image src={Logo} width={43} height={40} alt={"logo"} />
          </div>
          <div className="outline-0 rounded-md text-2xl text-gray-700 font-extrabold px-4 py-1 uppercase inline-flex justify-center items-end cursor-default">
            Nexa Mart
          </div>
        </div>

        <div className="w-2/5 flex justify-center items-center">
          <SearchBar />
        </div>

        <div className=" flex justify-end w-3/6 sm:w-2/6 md:w-1/5 pt-2 pl-2 ">
          {cart.length != 0 && (
            <div className="translate-x-12 text-center w-5 h-5 bg-rose-500 text-white text-sm font-medium rounded-full ">
              {cart.length}
            </div>
          )}
          <div className="w-8 text-indigo-700 hover:text-violet-700 cursor-pointer transition-all duration-300 inline-flex justify-center ">
            <ShoppingBagIcon
              onClick={() => {
                handleCartOpen();
                // setProduct(item);
              }}
            />
          </div>

          <div>
            {state.user ? (
              // Username when logged in //
              <div className="pt-2">
                <div
                  className="flex gap-2  "
                  // onClick={() => {
                  //   setVisible2(true);
                  // }}
                >
                  <div className="">
                    <Popover>
                      {({ open }) => (
                        <>
                          <Popover.Button className="outline-0 rounded-md text-lg text-gray-700 font-bold px-4 py-1 min-w-[140px] uppercase inline-flex justify-center ">
                            <span>{state.user.name?.split(" ")[0]}</span>
                            <ChevronDownIcon className=" h-6 w-6 pl-1" />
                          </Popover.Button>

                          <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Popover.Panel static>
                              <ProfileModal />
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </div>
                </div>
              </div>
            ) : (
              // Sign in option when logged out //
              <div
                className="pt-2 cursor-pointer flex text-xl font-bold text-[#130F49]"
                onClick={() => {
                  handleShowModal();
                }}
              >
                Sign In
              </div>
            )}
          </div>
        </div>
      </div>
      <LoginModal visible={visible} setVisible={setVisible} />
      <CartViewModal visible={isCartVisible} setVisible={setCartVisible} />
    </div>
  );
};

export default Navbar;
