import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-12 w-[100%] bg-slate-50">
      <ul>
        <li>
          <Link to="/userlist">UserList</Link>
        </li>
        <li>
          <Link to="/querybuilder">QueryBuilder</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
