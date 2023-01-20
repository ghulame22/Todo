import React, { useState, useEffect } from "react";
import { dark } from "./dark";
import { light } from "./light";
import "../AppNext.css";

function Todo() {
  const [todo, setTodo] = useState({ detail: "" });
  const [todoList, setTodoList] = useState(() => {
    // get the todos from localstorage
    const savedTodos = localStorage.getItem("todoList");
    // if there are todos stored
    if (savedTodos) {
      // return the parsed the JSON object back to a javascript object
      return JSON.parse(savedTodos);
      // otherwise
    } else {
      // return an empty array
      return [];
    }
  });
  const [ctodoList, setCTodoList] = useState(() => {
    const csavedTodos = localStorage.getItem("ctodoList");
    if (csavedTodos) {
      return JSON.parse(csavedTodos);
    } else {
      return [];
    }
  });
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    } else {
      return "dark";
    }
  });
  const [thisTheme, setThisTheme] = useState({});
  const [checked, setChecked] = useState("btnUncheck");
  const [remCount, setRemCount] = useState(0);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      setThisTheme({ ...light });
    } else {
      setTheme("dark");
      setThisTheme({ ...dark });
    }
  };

  useEffect(() => {
    localStorage.setItem("ctodoList", JSON.stringify(ctodoList));
    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("theme", theme);
    setTheme("dark");
    setThisTheme(dark);
  }, [ctodoList]);

  const createTodo = (e) => {
    e.preventDefault();
    if (todo.detail !== "") {
      let tempArr = [...todoList];
      todo.isEdit = false;
      tempArr.push(todo);
      setTodoList(tempArr);
      setCTodoList(tempArr);
      setTodo({ detail: "" });
      let count = tempArr.filter((item) => item.isEdit !== false);
      setRemCount(tempArr.length - count.length);
    }
  };

  const taskDone = (index) => {
    let tempArr = [...todoList];
    let tempArr2 = [...ctodoList];
    tempArr2[index].isEdit = !tempArr2[index].isEdit;
    let count = tempArr.filter((item) => item.isEdit !== false);
    setRemCount(tempArr.length - count.length);
    checked === "btnUncheck"
      ? setChecked("btnChecked")
      : setChecked("btnUncheck");
    setCTodoList(tempArr2);
    setTodoList(tempArr);
  };

  const deleteItem = (index) => {
    let tempArr = [...todoList];
    tempArr.splice(index, 1);
    setCTodoList(tempArr);
    setTodoList(tempArr);
    let count = tempArr.filter((item) => item.isEdit !== false);
    setRemCount(tempArr.length - count.length);
  };

  const allItem = () => {
    setCTodoList([...todoList]);
  };

  const active = () => {
    let tempArr = [...todoList];
    let active = tempArr.filter((item) => item.isEdit !== true);
    setCTodoList(active);
  };

  const completed = () => {
    let tempArr = [...todoList];
    let completed = tempArr.filter((item) => item.isEdit !== false);
    setCTodoList(completed);
  };

  const clearComplete = () => {
    let tempArr = [...todoList];
    let clear = tempArr.filter((item) => item.isEdit === false);
    setTodoList(clear);
    setCTodoList(clear);
  };

  return (
    <main className={"theme"} style={{ background: `${thisTheme.mainBg}` }}>
      <div
        className="bgCover"
        style={{ backgroundImage: `url(${thisTheme.bgImage})` }}
      >
        <div className="head">
          <h1>TODO</h1>
          <button
            className="nightMode"
            onClick={() => toggleTheme()}
            type="button"
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                <path
                  fill="#FFF"
                  fillRule="evenodd"
                  d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
                <path
                  fill="#FFF"
                  fillRule="evenodd"
                  d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
                />
              </svg>
            )}
          </button>
        </div>
        <form onSubmit={createTodo} className="inputForm">
          <div className="btn"></div>
          <input
            className="input"
            style={{
              background: `${thisTheme.inputBg}`,
              color: `${thisTheme.color}`,
            }}
            type="text"
            value={todo.detail}
            onChange={(e) => setTodo(() => ({ detail: e.target.value }))}
            placeholder="Create a new todo..."
          />
        </form>
        <div
          className="todoList"
          style={{
            background: `${thisTheme.inputBg}`,
            boxShadow: `${thisTheme.shadow}`,
          }}
        >
          {ctodoList.map((todo, index) => (
            <div className="item" key={index.toString()}>
              <div
                className={todo.isEdit ? "btnChecked" : "btnUncheck"}
                onClick={() => taskDone(index)}
              >
                <div className="check">
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                    <path
                      fill="none"
                      stroke="#FFF"
                      strokeWidth="2"
                      d="M1 4.304L3.696 7l6-6"
                    />
                  </svg>
                </div>
              </div>
              <div
                className={todo.isEdit ? "itemName2" : "itemName"}
                style={{ color: `${thisTheme.color}` }}
              >
                {todo.detail}
              </div>
              <div className="btnCross" onClick={() => deleteItem(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path
                    fill="#494C6B"
                    fillRule="evenodd"
                    d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
        <div
          className="menu"
          style={{
            background: `${thisTheme.inputBg}`,
            boxShadow: `${thisTheme.shadow}`,
          }}
        >
          <div className="menuOption1">
            {remCount} items left of {todoList.length}
          </div>
          <div className="menuSubmenu">
            <div className="menuSubmenuitem" onClick={allItem}>
              All
            </div>
            <div className="menuSubmenuitem" onClick={active}>
              Active
            </div>
            <div className="menuSubmenuitem" onClick={completed}>
              Completed
            </div>
          </div>
          <div className="menuOption2" onClick={clearComplete}>
            Clear Completed
          </div>
        </div>
        <div
          className="menuMob"
          style={{
            background: `${thisTheme.inputBg}`,
            boxShadow: `${thisTheme.shadow}`,
          }}
        >
          <div onClick={allItem}>All</div>
          <div onClick={active}>Active</div>
          <div onClick={completed}>Completed</div>
        </div>
      </div>
    </main>
  );
}

export default Todo;
