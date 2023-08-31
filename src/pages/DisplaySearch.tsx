type SearchResult = {
  name: string | null;
  email: string | null;
  image: string | null;
};

export default function DisplaySearch({
  searchData,
}: {
  searchData: SearchResult[];
}) {
  return (
    <div>
      {searchData.map((item, index) => (
        <div
          key={index}
          className="mb-5 w-[350px] max-w-md rounded-lg bg-slate-600 p-5 text-white shadow-md"
        >
          <h3 className="text-xl font-semibold">Username: {item.name}</h3>
          <p className="text-gray-200">Email: {item.email}</p>

          {/* <img src={item.image} alt={`Image for ${item.name}`} className="rounded-full mt-3" /> */}
        </div>
      ))}
    </div>
  );
}
