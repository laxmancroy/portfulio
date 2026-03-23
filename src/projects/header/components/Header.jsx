import { Navbar } from "../layout/Navbar";

export const Header = () => {
  return (
    <header className="shadow-md px-5 sm:px-0">
      <div className="container flex justify-between items-center mx-auto py-4">
        <div className="">Zaptro</div>
        <Navbar />
      </div>
    </header>
  );
};
