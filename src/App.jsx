import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Nav from "./components/Nav/Nav";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ApisAndPromises from "./pages/ApisAndPromises/ApisAndPromises";
import Tables from "./pages/Tables/Tables";
import Forms from "./pages/Forms/Forms";
import CodePractice from "./pages/CodePractice/CodePractice";
import FlushSync from "./pages/Flushsync/Flushsync";
import JsClasses from "./pages/JsClasses/JsClasses";
import LinkedLists from "./pages/LinkedLists/LinkedLists";
import ToDoList from "./pages/ToDoList/ToDoList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apis-and-promises" element={<ApisAndPromises />} />
          <Route path="/react" element={<ApisAndPromises />} />
          <Route path="/react/state-misc/flushsync" element={<FlushSync />} />
          <Route path="/react/state-misc/todo-list" element={<ToDoList />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/classes" element={<JsClasses />} />
          <Route path="/linkedlists" element={<LinkedLists />} />
          <Route path="/code-practice" element={<CodePractice />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
