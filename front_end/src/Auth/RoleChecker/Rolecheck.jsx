import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const RoleChecker = ({ children, isAuthenticated,user}) => {
console.log(user)

  const location = useLocation();
  const protectedRoutes = [
    "/doctorDash_board",
    "/AdminDash_board",
    "/pharmaDash_board",
  ];
    
  // Redirect unauthenticated users from protected routes
  if (!isAuthenticated) {
    if (protectedRoutes.includes(location.pathname)) {
      console.log("Redirecting to home: User not authenticated.");
      return <Navigate to="/" />;
    }
  }

  // Redirect authenticated users based on their roles
  if (isAuthenticated && user) {
    const roleRedirects = {
      doctor: "/doctorDash_board",
      Pharma: "/pharmaDash_board",
      default: "/AdminDash_board",
    };

    const redirectPath = roleRedirects[user.userrole || user.role] || roleRedirects.default;

    // Redirect if the user is trying to access a path that is not their dashboard
    if (location.pathname !== redirectPath) {
      return <Navigate to={redirectPath} />;
    }
  }

  // Render children if no redirection occurs
  return <>{children}</>;
};

export default RoleChecker;