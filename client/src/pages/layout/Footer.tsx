import { Link } from "react-router";

const Footer = () => {
  const date = new Date();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="footer">
      <h1 className="text-center">
        All Right Reserved &copy; {date.getFullYear()}{" "}
        <Link
          to="/"
          onClick={scrollToTop}
          className="underline font-semibold text-yellow-400 hover:text-yellow-500 duration-150"
        >
          E-SHOP
        </Link>
      </h1>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
