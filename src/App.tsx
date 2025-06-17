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
import { createContext, useState } from "react";
import BlankCanvas from "./pages/BlankCanvas/BlankCanvas";
import ToDoList from "./pages/ToDoList/ToDoList";

type ExampleContextType = {
  globalData: any;
  setGlobalData: React.Dispatch<React.SetStateAction<any>>;
};

export const ExampleContext = createContext<ExampleContextType | undefined>(
  undefined,
);

function App() {
  const [globalData, setGlobalData] = useState<any>(
    "You've reached the Context API Data",
  );

  return (
    <>
      <ExampleContext.Provider value={{ globalData, setGlobalData }}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apis-and-promises" element={<ApisAndPromises />} />
            <Route path="/react" element={<ApisAndPromises />} />
            <Route path="/react/state-misc/flushsync" element={<FlushSync />} />
            <Route path="/react/state-misc/todo-list" element={<ToDoList />} />
            <Route
              path="/react/state-misc/blank-canvas"
              element={<BlankCanvas />}
            />
            <Route path="/tables" element={<Tables />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/classes" element={<JsClasses />} />
            <Route path="/linkedlists" element={<LinkedLists />} />
            <Route path="/code-practice" element={<CodePractice />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </ExampleContext.Provider>
    </>
  );
}

export default App;
