type CardProps = {
  title: string;
  desc: string | null | undefined;
  descCapitalize?: boolean;
};
const Card = ({ title, desc, descCapitalize = false }: CardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-normal mb-2">{title}</h2>
      <p className={`${descCapitalize ? "capitalize" : ""} text-2xl font-bold`}>
        {desc}
      </p>
    </div>
  );
};

export default Card;
