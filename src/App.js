import "./App.css";
import { Suspense } from "react";
import Header from "./component/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QueryBuilder from "./component/QueryBuilder";
import UserList from "./component/UserList";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/userlist" element={<UserList />} />
            <Route path="/querybuilder" element={<QueryBuilder />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
