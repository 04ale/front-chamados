import Navbar from "../components/Navbar";
import Tickets from "../components/home/Tickets";

function Home() {


  return (
    <div >
      <Navbar />
      <div className="md:ml-[119px] xl:ml-[336px] max-md:py-[40px] md:pb-[40px]">
        <Tickets />
        
      </div>
    </div>
  );
}

export default Home;
