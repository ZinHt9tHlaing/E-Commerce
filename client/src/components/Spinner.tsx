// components/Spinner.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

interface SpinnerProps {
  redirectTo?: string;
  seconds?: number;
}

const Spinner = ({ redirectTo = "/login", seconds = 3 }: SpinnerProps) => {
  const [count, setCount] = useState(seconds);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (count === 0) {
      navigate(redirectTo, {
        state: { from: location.pathname },
        replace: true,
      });
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, navigate, redirectTo, location.pathname]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h4 className="mb-3">Redirecting in {count} second(s)...</h4>

      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
