import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import ToDoAp from "./todo-test/props.test";

function App() {
  const [count, setCount] = useState(0);

  const info = {
    name: "khanh",
    age: 33,
    strength: {
      learning: 100,
      fighting: 80,
    },
    experience: 12,
  };

  const handleTest = (name: string) => {
    alert(`hi em yêu ${name}`);
  };
  const [listToDo, setListToDo] = useState(["abc", "edf", "uhy", "iuj", "err"]);
  return (
    <>
      <ToDoAp
        variant={info}
        khanhFunc={handleTest}
        listToDo={listToDo}
        setListToDo={setListToDo}
      />

      <ul>
        {listToDo.map((item) => {
          return (
            <>
              <li>{item}</li>
            </>
          );
        })}
      </ul>

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
