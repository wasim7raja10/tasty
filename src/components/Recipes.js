const sizeClasses = {
  height: "h-36",
  width: "w-36",
};

function Recipes({ data }) {
  const date = new Date(data.created_at);
  return (
    <div
      key={data.id}
      className="flex items-center rounded-lg bg-white shadow-lg overflow-hidden"
    >
      <img
        className={`${sizeClasses.height} ${sizeClasses.width} flex-shrink-0`}
        src={data.thumbnail_url}
        alt={data.name}
      />
      <div className="p-3 flex flex-col justify-between h-full">
        <h3 className="sm:text-lg font-semibold text-gray-800">{data.name}</h3>
        <p className="text-gray-600 text-sm">
          <span className=" ">created at: </span>
          <span className=" text-gray-900 font-medium">
            {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
          </span>{" "}
        </p>
      </div>
    </div>
  );
}

export default Recipes;
