function CashBoxDisplay(props) {
  // Extract the name prop
  const { name, img, height, width } = props;

  return (
    <>
      <div className="flex h-24 flex-col rounded-[12px] outline-1 mr-3 justify-center mt-4">
        <img
          className={`inline-block h-${height} w-${width} rounded-full ring-2 ring-gray-500 mt-3 mr-3`}
          src={img}
          alt=""
        ></img>
        <h2 className="mt-2 mr-3 text-center text-xl font-bold">{name}</h2>
      </div>
    </>
  );
}

export default CashBoxDisplay;
