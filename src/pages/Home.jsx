import React from "react";
import Navbar from "../components/Navbar";
import Tickets from "../components/Tickets";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="md:ml-[97px] xl:ml-[300px] max-md:pt-[40px]">
        <Tickets />
      </div>
    </div>
  );
}

export default Home;
