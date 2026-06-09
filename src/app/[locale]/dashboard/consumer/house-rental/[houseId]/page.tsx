import HouseDetails from "@/components/Dashboard/Consumer/HouseRental/HouseDetails/HouseDetails";
import { mockHouses } from "@/components/Dashboard/Consumer/HouseRental/data/mockHouseData";

type PageProps = {
  params: {
    houseId: string;
  };
};

const SingleHouse = ({ params }: PageProps) => {
  const house = mockHouses.find(
    (h) => h.id === params.houseId
  );

  if (!house) {
    return <div className="p-6">House not found</div>;
  }

  return <HouseDetails house={house}  />;
};

export default SingleHouse;
