import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader/AppHeader";
import Navbar from "../components/Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <Navbar />
    </>
  );
}
