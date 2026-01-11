import { Link } from "react-router";

const Footer = () => {
  const date = new Date();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="text-white p-6 bg-linear-to-r from-[#434343] to-black">
      <h1 className="text-center text-lg">
        All Right Reserved &copy; {date.getFullYear()}
        {" - "}
        <Link
          to="/"
          onClick={scrollToTop}
          className="underline font-semibold text-yellow-400 hover:text-yellow-500 duration-150"
        >
          E SHOP
        </Link>
      </h1>
      <div className="text-center mt-3">
        <Link
          to="/about"
          className="hover:border-b hover:border-b-solid hover:border-b-white duration-100"
        >
          About
        </Link>
        <span className="px-3">|</span>
        <Link
          to="/contact"
          className="hover:border-b hover:border-b-solid hover:border-b-white duration-100"
        >
          Contact
        </Link>
        <span className="px-3">|</span>
        <Link
          to="/policy"
          className="hover:border-b hover:border-b-solid hover:border-b-white duration-100"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
