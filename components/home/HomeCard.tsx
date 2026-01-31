import { ProductJson } from "@/data/Products";
import CardItem from "../CardItem";

const HomeCard = ({
  title,
  start,
  end,
}: {
  title: string;
  start: number;
  end: number;
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center font-mono mb-8">{title}</h2>
      <div className="grid grid-cols-1 place-items-center md:grid-cols-3 gap-6 mb-20">
        {ProductJson.slice(start, end).map((e) => (
          <CardItem
            key={e.id}
            item={{
              id: e.id,
              name: e.name,
              price: e.price,
              link: e.link,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
