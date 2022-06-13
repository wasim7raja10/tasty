import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const URL = "https://tasty.p.rapidapi.com/recipes/list";

const HEADERS = {
  "X-RapidAPI-Key": "203d3ecfdcmsh4aa3a95cb6fb9f4p12a35ejsn890928bf2301",
  "X-RapidAPI-Host": "tasty.p.rapidapi.com",
};

const fetchRecipes = (input) =>
  axios.get(URL, {
    headers: HEADERS,
    params: { from: "0", size: "10", q: input },
  });

function App() {
  const [input, setInput] = useState("");
  const { isLoading, isError, error, data, refetch } = useQuery(
    "recipes",
    () => fetchRecipes(input),
    {
      enabled: false,
    }
  );

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
    console.log(data.data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error}</div>;
  return (
    <div className="p-2">
      <h1>Something</h1>
      <form onSubmit={handleSubmit}>
        <input
          className=" border-black border"
          type="text"
          onChange={handleInput}
        />
        <button className="border border-red-500 px-2">Submit</button>
      </form>
      {data?.data.results.map((recipe) => (
        <div key={recipe.id}>
          <p>{recipe.name}</p>
          <img width={60} src={recipe.thumbnail_url} alt={recipe.name} />
        </div>
      ))}
    </div>
  );
}

export default App;
