import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

export default function UserList() {
  const [people, setPeople] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [query, setQuery] = useState("");

  const sortTable = (title) => {
    let data = [];
    if (isAscending === true) {
      data = [...people].sort((a, b) => (a[title] < b[title] ? -1 : 1));
    } else {
      data = [...people].sort((a, b) => (a[title] > b[title] ? -1 : 1));
    }
    setPeople(data);
    setIsAscending((prevState) => !prevState);
  };

  const searchPeople = (people, query) => {
    return people.filter((person) => {
      return Object.keys(people[0]).some((key) =>
        person[key].toLowerCase().includes(query)
      );
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        const people = data.map(({ name, username, email, address }) => ({
          name: name,
          username: username,
          email: email,
          address: `${address.street} - ${address.city} - ${address.zipcode}`,
        }));
        setPeople(people);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="text-xl">
      <input
        type="text"
        className=" pr-10 text-gray-700 border-black bg-white bg-clip-padding border-2 border-solid w-96"
        id="fname"
        name="fname"
        placeholder=""
        value={query}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      {query !== "" && (
        <button
          className=" text-red-500 font-bold ml-4"
          onClick={() => setQuery("")}
        >
          X
        </button>
      )}
      <table className="mt-10 w-full">
        <tr>
          {people.length !== 0
            ? Object.keys(people[0]).map((p, index) => (
                <th
                  className="capitalize text-start cursor-pointer"
                  key={index}
                  onClick={() => sortTable(p)}
                >
                  <div className="flex items-center">
                    {p}
                    <div className="flex flex-col text-xs ml-1 mt-1">
                      <CaretUpOutlined />
                      <CaretDownOutlined className="-mt-1" />
                    </div>
                  </div>
                </th>
              ))
            : ""}
        </tr>
        {people.length !== 0
          ? searchPeople(people, query).map((p, index) => (
              <tr
                onClick={() => setQuery(p.name.toLowerCase())}
                className={`hover:bg-pink-200 cursor-pointer ${
                  index % 2 === 0 ? "bg-blue-50" : "bg-blue-100"
                }`}
                key={index}
              >
                {Object.entries(p).map((a, i) => (
                  <td>
                    {Object.keys(p)[i] === "picture" ? (
                      <img className="" src={Object.values(p)[i]} />
                    ) : (
                      Object.values(p)[i]
                    )}
                  </td>
                ))}
              </tr>
            ))
          : ""}
      </table>
    </div>
  );
}
