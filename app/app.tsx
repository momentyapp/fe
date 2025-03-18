import { Outlet } from "react-router";

import useSessionRestore from "~/hooks/useSessionRestore";

export default function App() {
  useSessionRestore();

  return <Outlet />;
}
