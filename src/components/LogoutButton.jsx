import { logout } from "../auth";

const LogoutButton = () => {
  return <button onClick={logout}>登出</button>;
};

export default LogoutButton;