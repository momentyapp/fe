import { Cookies } from "react-cookie";

export default function logout() {
  const cookies = new Cookies();
  cookies.remove("refresh_token");
  window.location.reload();
}
