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
        <div key={index}>
          <h3>{item.name}</h3>
          <p>{item.email}</p>
          {/* <img src={item.image} alt={`Image for ${item.name}`} /> */}
          {/* image featuring not yet achieved */}
        </div>
      ))}
    </div>
  );
}
