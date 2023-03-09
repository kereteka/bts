import { PlusCircleFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";

const QueryBuilder = () => {
  const [state, setState] = useState({
    condition: "AND",
    rules: [],
  });

  const handleObjChange = (newObj) => {
    setState(newObj);
  };

  console.log(state);

  return (
    <div className="w-full">
      <QueryComponent obj={state} onObjChange={handleObjChange} />
      {JSON.stringify(state)}
    </div>
  );
};

const QueryComponent = ({ item, idx, onObjChange }) => {
  const [obj, setObj] = useState(
    item || {
      condition: "AND",
      rules: [],
    }
  );

  const handleAddRule = () => {
    const newRule = {
      value: "",
    };
    const updatedObj = {
      ...obj,
      rules: [...obj.rules, newRule],
    };
    setObj(updatedObj);
    onObjChange(updatedObj);
  };

  const handleAddGroup = () => {
    const newGroup = {
      condition: "AND",
      rules: [],
    };
    const updatedObj = {
      ...obj,
      rules: [...obj.rules, newGroup],
    };
    setObj(updatedObj);
    onObjChange(updatedObj);
  };

  const setNewRuleText = (index, value) => {
    const updatedRules = [...obj.rules];
    updatedRules[index] = { value };
    const updatedObj = {
      ...obj,
      rules: updatedRules,
    };
    setObj(updatedObj);
    onObjChange(updatedObj);
  };

  const handleDelete = (index) => {
    const updatedRules = [...obj.rules];
    updatedRules.splice(index, 1);
    const updatedObj = {
      ...obj,
      rules: updatedRules,
    };
    setObj(updatedObj);
    onObjChange(updatedObj);
  };

  return (
    <>
      <div
        className="w-[90%] h-auto ml-10 relative bg-[#FCF4EA] border 
        "
      >
        {/* {obj.condition} */}
        <div className=" flex justify-between ">
          <Select
            className="w-20"
            value={obj.condition}
            onChange={(value) => {
              const updatedObj = {
                ...obj,
                condition: value,
              };
              setObj(updatedObj);
              onObjChange(updatedObj);
            }}
            style={{ zIndex: "50" }}
          >
            <Option value="AND">AND</Option>
            <Option value="OR">OR</Option>
          </Select>
          <div className="">
            <Button
              className="bg-[#55B959] text-white font-bold "
              onClick={() =>
                setTimeout(() => {
                  handleAddRule();
                }, 750)
              }
            >
              <span class="icon-wrapper ">
                <PlusOutlined
                  style={{
                    fontWeight: "bold",
                    display: "block",
                    margin: "auto",
                    marginRight: "5px",
                    strokeWidth: "150",
                    stroke: "white",
                  }}
                />
              </span>
              Add Rule
            </Button>
            <Button
              className="bg-[#55B959] text-white font-bold"
              onClick={() =>
                setTimeout(() => {
                  handleAddGroup();
                }, 750)
              }
            >
              <span class="icon-wrapper">
                <PlusCircleFilled
                  style={{
                    fontWeight: "bold",
                    display: "block",
                    margin: "auto",
                    marginRight: "5px",
                  }}
                />
              </span>
              Add Group
            </Button>
          </div>
        </div>

        {obj.rules.map((item, i) => {
          return item.hasOwnProperty("condition") ? (
            <div
              key={i}
              className={` flex brightness-[95%] before:border-b before:border-l before:absolute before:z-40  before:-mt-4 before:ml-5 before:content-[''] before:w-5 before:h-[100%] before:border-l-slate-500 before:border-blue-500${
                obj.rules.length - 1 === i ? " before:rounded-bl-lg" : ""
              } `}
              // style={{ backgroundColor: `hsl(44, 85%, ${95 - i}%)` }}
            >
              <QueryComponent
                key={i}
                idx={i}
                item={item}
                onObjChange={(updatedObj) => {
                  const updatedRules = [...obj.rules];
                  updatedRules[i] = updatedObj;
                  const updatedObjWithNewGroup = {
                    ...obj,
                    rules: updatedRules,
                  };
                  setObj(updatedObjWithNewGroup);
                  onObjChange(updatedObjWithNewGroup);
                }}
              />
              <Button
                className="bg-red-500"
                onClick={() =>
                  setTimeout(() => {
                    handleDelete();
                  }, 750)
                }
              >
                Delete
              </Button>
            </div>
          ) : (
            <div
              key={i}
              className={` before:border-b before:border-l before:inline-block before:-mt-4 before:ml-5 before:content-[''] before:w-5 before:h-8 before:border-l-slate-500 before:border-blue-500 ${
                obj.rules.length - 1 === i ? "before:rounded-bl-lg" : ""
              } `}
            >
              <Input
                key={i}
                value={item.value}
                onChange={(e) => setNewRuleText(i, e.target.value)}
                className=" w-40"
              ></Input>
              <Button
                className="bg-red-500"
                onClick={() =>
                  setTimeout(() => {
                    handleDelete();
                  }, 750)
                }
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QueryBuilder;
