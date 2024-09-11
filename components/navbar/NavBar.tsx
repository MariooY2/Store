import { Suspense } from "react";
import Container from "../global/Container";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
function Navbar() {
  return (
    <nav className="border-b ">
      <Container className="flex justify-between items-center  gap-2 py-6">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>

        <div className="flex gap-4 items-center ">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
