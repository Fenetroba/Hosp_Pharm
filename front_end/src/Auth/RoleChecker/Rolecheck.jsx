import { useLocation, Navigate } from "react-router-dom";

const RoleChecker = ({ user, role, children }) => {
  const location = useLocation();

  const protectedRoutes = [
    "/doctorDash_board",
    "/AdminDash_board",
    "/pharmaDash_board",
  ];

  if (!user && protectedRoutes.includes(location.pathname)) {
    return <Navigate to="/" />;
  }

  if (user) {
    const roleRedirects = {
      doctor: "/doctorDash_board",
      Pharma: "/pharmaDash_board",
      default: "/AdminDash_board",
    };

    const redirectPath = roleRedirects[role] || roleRedirects.default;

    if (location.pathname !== redirectPath) {
      return <Navigate to={redirectPath} />;
    }
  }

  return <div>{children}</div>;
};

export default RoleChecker;