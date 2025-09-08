import React from "react";
import Navbar from "../components/Navbar";
import Tickets from "../components/Tickets";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="md:ml-[119px] xl:ml-[329px] max-md:pt-[40px] mb-14">
        <Tickets />
      </div>
    </div>
  );
}

export default Home;
