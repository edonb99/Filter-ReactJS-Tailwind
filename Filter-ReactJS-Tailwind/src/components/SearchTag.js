import React, { useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import data from "../data";
import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.

const SearchTag = (props) => {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [output, setOutput] = useState([]);

  const { self, searchNr, setSearchNr, setChanges } = props;
  const { name, initialRule } = self;

  const [rule, setRule] = useState(0);

  const handleChangeInput = (e) => {
    setInput(e);
  };

  useEffect(() => {
    if (rule === initialRule) return;
    self.rule = rule;
  }, [rule]);

  useEffect(() => {
    setChanges((old) => old + 1);
  }, [self.rule, self.search]);

  useEffect(() => {
    if (input === "") return;
    const outputItem = data.filter((dataItem) =>
      dataItem.toLowerCase().includes(input.toLowerCase())
    );
    setOutput(outputItem);
  }, [input]);

  useEffect(() => {
    if (self.search === tags) return;
    self.search = tags;
  }, [tags]);

  function handlePres(emrin) {
    setTags((perpara) => [...perpara, emrin]);
    setInput("");
    setOutput([]);
  }

  const removeTag = () => {
    setSearchNr(
      searchNr.filter((obj) => {
        return obj.id !== self.id;
      })
    );
  };

  const handleRuleChange = (prek) => {
    setRule(prek);
  };

  const handleTagInput = (evt) => {
    const unwantedRules = ["is", "isnot"];
    if (unwantedRules.includes(self.rule)) return;

    setTags(evt);
  };

  const renderCorrectInput = (name) => {
    const numberNames = ["Price"];
    if (numberNames.includes(name))
      return (
        <input
          type="number"
          min="0"
          className="px-x py-2 w-full focus:border-none focus:outline-none"
        />
      );
    return (
      <TagsInput
        value={tags}
        inputValue={input}
        onChange={(e) => handleTagInput(e)}
        onChangeInput={handleChangeInput}
        className="px-x py-2 w-full focus:border-none focus:outline-none"
      />
    );
  };

  return (
    <div className="flex items-start p-5">
      <div className=" xl:w-96">
        <h2 className="mt-6 font-bold">{name}</h2>
        <select
          className="block pl-3 pr-3 py-2 
            focus:ring-primary focus:border-primary rounded-md mt-1 text-xs bg-gray-100 sm:text-base  
            text-gray-700 bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          value={rule}
          onChange={(e) => handleRuleChange(e.target.value)}
        >
          <option defaultValue>{name}</option>
          <option value="is">is</option>
          <option value="isnot">is not</option>
          <option value="startswith">starts with</option>
          <option value="endswith">ends with</option>
          <option value="contains">contains</option>
          <option value="doesnotcontain">does not contain</option>
        </select>
      </div>

      <div className="flex flex-1 ">
        <div className="flex flex-col ml-4 mt-10 justify-start flex-1 ">
          {/* {self.name === "Price" ? (
            <input type="number" />
          ) : (
            <TagsInput
              value={tags}
              inputValue={input}
              onChange={(e) => handleTagInput(e)}
              onChangeInput={handleChangeInput}
              className="px-x py-2 w-full focus:border-none focus:outline-none"
            />
          )} */}
          {renderCorrectInput(self.name)}

          <div className="overflow-y-scroll resize-none max-h-20 cursor-pointer ">
            <div className="flex flex-col border border-gray-200">
              {output.map((item) => (
                <span
                  onClick={() => handlePres(item)}
                  key={item}
                  className="border-b hover:bg-gray-300 border-gray-200 px-4 py-2"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-10">
          <svg
            onClick={() => removeTag()}
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="red"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchTag;
