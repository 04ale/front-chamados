import Navbar from "../components/Navbar";
import ClosedTickets from "../components/ClosedTickets";

function Closed() {
  return (
    <div>
      <Navbar />
      <div className="md:ml-[119px] xl:ml-[336px] max-md:pt-[40px] mb-14">
        <ClosedTickets />
        
      </div>
    </div>
  );
}

export default Closed;
