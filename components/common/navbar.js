import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";

import { Context } from "../../context/authContext";
import LoginModal from "../modal/loginModal";
import Logo from "../../public/assets/logo.png";
import NavLinks from "../../constants/navlinks.js";
import SearchBar from "./searchBar";
import ProfileModal from "../modal/profileModal";
import {
  ChevronDownIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  // Context State

  const { state } = useContext(Context);

  const router = useRouter();

  const handleShowModal = () => {
    setVisible(true);
  };

  return (
    <div className="">
      <div className="w-full h-20 px-3 sm:px-4 lg:px-12 py-3.5 bg-white text-lg drop-shadow-md flex justify-between -center sticky z-30 top-0 ">
        <div className="flex -center w-1/5 ">
          <div
            className="text-2xl font-bold cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <Image src={Logo} width={50.0} height={58.6} alt={"logo"} />
          </div>
          <div></div>
        </div>

        <div className="w-2/5 flex justify-center items-center">
          <SearchBar />
        </div>
        <div className="flex items- justify-end w-3/6 sm:w-2/6 md:w-1/5 pt-2 pl-2 ">
          <div>
            {state.user ? (
              // Username when logged in //
              <div className="pt-2">
                <div
                  className="flex gap-2  "
                  onClick={() => {
                    setVisible2(true);
                  }}
                >
                  <div className="w-8 text-indigo-700 hover:text-indigo-500 transition-all duration-300"></div>
                  <div className="">
                    <Popover>
                      {({ open }) => (
                        <>
                          <Popover.Button className="outline-0 rounded-md text-lg text-gray-700 font-bold px-4 py-1 min-w-[140px] uppercase inline-flex justify-center items-center ">
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
                  // setShowModal(true);
                }}
              >
                Sign In
              </div>
            )}
          </div>
        </div>
      </div>
      <LoginModal visible={visible} setVisible={setVisible} />
    </div>
  );
};

export default Navbar;
