type Props = {
  checker: boolean | undefined;
  textPositive: string;
  textNegative: string;
};

const AbsenceStatus = ({ checker, textPositive, textNegative }: Props) => {
  return (
    <div
      className={`flex p-3 justify-center ${
        checker ? "bg-green-500" : "bg-red-500"
      } items-center  rounded-lg`}
    >
      <p className="text-white text-xl text-center font-semibold">
        {checker ? textPositive : textNegative}
      </p>
    </div>
  );
};

export default AbsenceStatus;
