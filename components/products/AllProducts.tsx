import { ProductJson } from "@/data/Products";
import CardItem from "../CardItem";

const AllProducts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center  gap-3">
      {ProductJson.map((item) => (
        <CardItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AllProducts;
