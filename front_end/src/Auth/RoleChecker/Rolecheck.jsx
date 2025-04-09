import { useLocation, Navigate } from "react-router-dom";

const RoleChecker = ({ children, isAuthenticated, user }) => {
  const location = useLocation();
  const protectedRoutes = [
    "/doctorDash_board",
    "/AdminDash_board",
    "/pharmaDash_board",
  ];

  console.log("User:", user);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("Current Path:", location.pathname);

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

    const redirectPath = roleRedirects[user.role] || roleRedirects.default;
    console.log("User Role:", user.role);
    console.log("Expected Redirect Path:", redirectPath);

    // Redirect if the user is trying to access a path that is not their dashboard
    if (location.pathname !== redirectPath) {
      console.log("Redirecting to:", redirectPath);
      return <Navigate to={redirectPath} />;
    }
  }

  // Render children if no redirection occurs
  return <>{children}</>;
};

export default RoleChecker;