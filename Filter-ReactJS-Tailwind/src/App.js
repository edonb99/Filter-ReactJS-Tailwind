import React, { useEffect, useState } from "react";
import "./styles.css";
import "./styles/tailwind-pre-build.css";
import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.
import SearchTag from "./components/SearchTag";

const makeObj = (name, rule) => {
  const id = `${name}${Math.round(Math.random() * 100)}`;
  console.log(id);
  const obj = {
    id,
    name,
    rule,
    search: ""
  };
  return obj;
};

const makeQuery = (global, items) => {
  return {
    [global]: [
      ...items.map((item) => ({ values: item.search, field: item.name }))
    ]
  };
};

export default function App() {
  const [searchNr, setSearchNr] = useState([]);
  const [changes, setChanges] = useState(0);
  const [match, setMatch] = useState("all");

  const incrementSearch = (item) => {
    const obj = makeObj(item, "is");
    setSearchNr((old) => [...old, obj]);
  };

  useEffect(() => {
    console.log(JSON.stringify(makeQuery(match, searchNr)));
  }, [changes]);

  return (
    <div className="App">
      <div className="flex flex-col p-4">
        <label className="block w-full text-gray-700 text-sm font-bold mb-2">
          Product Set Name
        </label>
        <input
          className=" shadow appearance-none border rounded py-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="productSetName"
          type="text"
        />
      </div>

      <div className="text-xs border-t border-b p-2 border-gray-300">
        <div className="flex items-center">
          <span>Match items for </span>
          <select
            className="block pl-3 pr-7 py-1
          focus:ring-primary focus:border-primary font-bold rounded-md text-xs bg-gray-100 sm:text-base  
          text-gray-700 mx-2 bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition ease-in-out m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={match}
            onChange={(e) => setMatch(e.target.value)}
          >
            <option value="all">all</option>
            <option value="or">at least one</option>
          </select>
          <span> of the following rules: </span>
        </div>
      </div>

      {searchNr.map((obj) => (
        <SearchTag
          key={obj.id}
          self={obj}
          searchNr={searchNr}
          setSearchNr={setSearchNr}
          setChanges={setChanges}
        />
      ))}
      <div className="ml-5 xl:w-96">
        <select
          className="block pl-3 pr-8 py-2 
          focus:ring-primary focus:border-primary font-bold	 rounded-md mt-5 text-xs bg-gray-300 sm:text-base  
          text-gray-700 bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition ease-in-out m-0
          focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
          value=""
          onChange={(e) => incrementSearch(e.target.value)}
        >
          <option defaultValue value="KrijoFilter">
            Krijo Filter
          </option>
          <option value="Gender">Gender</option>
          <option value="Brand">Brand</option>
          <option value="Size All">Size All</option>
          <option value="Size In Stock">Size In Stock</option>
          <option value="Initial Price">Initial Price</option>
          <option value="Price">Price</option>
          <option value="Total Stock">Total Stock</option>
          <option value="On Sale">On Sale</option>
          <option value="Has Image">Has Image</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5">
        <div className="flex flex-col">
          <div className="relative aspect-w-1 aspect-h-1 grayscale filter bg-gray-100">
            <div className="text-base md:text-2xl text-gray-900 mt-4 font-bold"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
