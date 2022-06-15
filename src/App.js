/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import Recipes from "./components/Recipes";
import Navbar from "./components/Navbar";
import Skeleton from "./components/Skeleton";

const URL = "https://tasty.p.rapidapi.com/recipes/list";

const HEADERS = {
  "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
};

const fetchRecipes = async (input, page) =>
  await axios.get(URL, {
    headers: HEADERS,
    params: { from: (page * 18).toString(), size: "18", q: input },
  });

function App() {
  const [input, setInput] = useState("");
  const [page, setPage] = useState(0);
  const [refreshed, setRefreshed] = useState(false);

  const { data, refetch, status, error, isFetching } = useQuery(
    ["recipes", page],
    () => fetchRecipes(input, page),
    {
      keepPreviousData: true,
      enabled: refreshed,
      refetchOnWindowFocus: false,
    }
  );

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setRefreshed(true);
    refetch();
  };

  const handleNextBtn = () => {
    setRefreshed(true);
    setPage((old) => old + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    refetch();
  };

  const handlePrevBtn = () => {
    setRefreshed(true);
    setPage((old) => Math.max(old - 1, 0));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    refetch();
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-md sm:max-w-xl lg:max-w-6xl mx-auto px-3 lg:px-12 py-8 ">
        {/* form */}
        <form onSubmit={handleSubmit} className="w-full flex justify-center">
          <div className="w-full sm:w-2/3 flex">
            <input
              className=" border-gray-700 border p-2 w-full rounded-l-sm "
              type="text"
              onChange={handleInput}
            />
            <button className="border border-red-500 p-2 hover:bg-red-400 hover:text-white rounded-r-sm">
              Submit
            </button>
          </div>
        </form>
        <p className="p-2 m-2 text-sm text-gray-700 w-full flex justify-center">
          {isFetching && <span>Fetching new data ... </span>}
        </p>
        {/* data */}
        {status === "loading" ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3 ">
            {Array(18)
              .fill(2)
              .map((_) => (
                <Skeleton />
              ))}
          </div>
        ) : status === "error" ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {data?.data.results.map((recipe) => (
              <Recipes key={recipe.id} data={recipe} />
            ))}
          </div>
        )}

        {/* pagination */}

        {data && (
          <div>
            <div className=" p-2 m-3 text-sm text-gray-700 flex space-x-6">
              <p className="">
                Showing <span className="font-medium">{page * 18}</span> to{" "}
                <span className="font-medium">
                  {Math.min(page * 18 + 17, data?.data.count)}
                </span>{" "}
                of <span className="font-medium">{data?.data.count}</span>{" "}
                results
              </p>
            </div>
            <div className=" flex justify-between sm:justify-center text-2xl space-x-4 ">
              <button
                className=" p-2 border hover:bg-red-400 hover:text-white disabled:bg-gray-300"
                onClick={handlePrevBtn}
                disabled={page === 0}
              >
                <MdKeyboardArrowLeft />
              </button>{" "}
              <button
                className=" p-2 border hover:bg-red-400 hover:text-white disabled:bg-gray-300"
                onClick={handleNextBtn}
                disabled={page * 18 + 17 >= data?.data.count}
              >
                <MdKeyboardArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
