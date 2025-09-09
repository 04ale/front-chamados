import ListUsers from "../components/ListUsers";
import Navbar from "../components/Navbar";

function Users() {
  

  return (
    <div>
      <Navbar />
      <div className="md:ml-[119px] xl:ml-[329px] max-md:pt-[40px] mb-14">
        <ListUsers />
      </div>
    </div>
  );
}

export default Users;
