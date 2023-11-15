// import { FcContacts } from "react-icons/fc";
import { Link } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Logout from "../component/Logout";

const Home = () => {
  const { accessToken } = useAuth();
  
  return (
    <div className=" w-full h-screen ">
      <nav className=" flex w-full h-fit justify-between items-center px-6 sm:px-8 md:px-14 lg:px-24 xl:px-36 py-6 bg-violet-200">
        <div className=" flex">
          <img src="./kk.svg" />
          <p className=" font-bold  text-orange-500 text-2xl">KK</p>
        </div>
        <div className=" flex md:gap-8 gap-3 font-semibold md:text-lg">
          {accessToken ? (
            <Logout />
          ) : (
            <Link to="/login" className=" py-2 ">
              Login
            </Link>
          )}
          {accessToken ? (
            <Link
              to="/contacts"
              className=" border border-green-400 bg-green-400 px-2 md:px-5 py-2 text-slate-100 hover:opacity-70 hover:cursor-pointer "
            >
              My Contacts
            </Link>
          ) : (
            <Link
              to="/register"
              className=" border border-green-400 bg-green-400 px-2 md:px-5 py-2 text-slate-100 hover:opacity-70 hover:cursor-pointer "
            >
              Get Started
            </Link>
          )}
        </div>
      </nav>
      <div className=" md:flex px-6 sm:px-8 md:px-14 lg:px-24 xl:px-36 py-6 justify-between">
        <div className=" md:w-1/2">
          <p className=" text-slate-50 text-3xl lg:text-6xl font-bold md:pt-24 pt-8 flex">
            Save & fetch contacts with ease.
          </p>
          <p className=" text-slate-50 pt-5 md:pb-10 py-5">
            Ready to simplify your life and supercharge your connections? Get
            started with our Contact Management App today and stay connected
            like never before. Your world awaits!
          </p>
          {accessToken ? (
            <Link
              to="/contacts"
              className=" border border-green-400 bg-green-400 px-2 md:px-5 py-2 text-slate-100 hover:opacity-70 hover:cursor-pointer "
            >
              My Contacts
            </Link>
          ) : (
            <Link
              to="/register"
              className=" border border-green-400 bg-green-400 px-2 md:px-5 py-2 text-slate-100 hover:opacity-70 hover:cursor-pointer "
            >
              Get Started
            </Link>
          )}
        </div>
        <div>
          <img src="./contact.svg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
