import React from "react";
import { useState } from "react";

export default function Formtodo() {
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [todos, setTodos] = useState([]);
  const [updatebtn, setUpdatebtn] = useState(false);
  const [id, setId] = useState("");

  //Add to Todo list
  function HandelOnAdd(e) {
    e.preventDefault();
    // let name = document.getElementById("title").value;
    // let discription = document.getElementById("discription").value;
    let id = 0;
    //console.log("Clicked " + name + " " + discription);
    if (name === "" || discription === "") {
      alert("No Values");
    } else {
      if (todos.length === 0) {
        id = 1;
      } else {
        id = todos[todos.length - 1].id + 1;
      }

      const values = {
        id: id,
        name: name,
        discription: discription,
      };
      setTodos([...todos, values]);
      document.getElementById("title").value = "";
      document.getElementById("discription").value = "";
      setName("");
      setDiscription("");
    }
  }
  //console.log(todos);

  //OnDelete
  function HandelOnDelete(id) {
    const removeitem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeitem);
    console.log("Deleted" + id);
  }

  //On Update
  function HandelOnUpdate(item) {
    // console.log("onUpdate");
    // console.log(item.discription);
    setUpdatebtn(true);
    document.getElementById("title").value = item.name;
    document.getElementById("discription").value = item.discription;
    setName(item.name);
    setDiscription(item.discription);
    // item.name = document.getElementById("title").value;
    // item.discription = document.getElementById("discription").value;
    // setUpdatebtn(false);
    setId(item.id);
  }

  //Update Values

  function updateValues(e) {
    e.preventDefault();
    console.log(id);
    console.log(todos);
    todos.map((todo) => {
      if (todo.id === id) {
        todo.name = name;
        todo.discription = discription;
      }
      
    });
    setTodos([...todos]);
    setUpdatebtn(false);
    // setName(todos[id].name,document.getElementById("title").value);
    // setDiscription(todos[id].discription,document.getElementById("discription").value);
  }
  return (
    <>
      <div className="form-container">
        <form className="form-style">
          <label className="form-labels">Name</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="form-labels" />
          <label className="form-labels">Description</label>
          <textarea
            id="discription"
            placeholder="Description"
            onChange={(e) => setDiscription(e.target.value)}
          />
          {updatebtn ? (
            <button id="updtbtn" onClick={updateValues}>
              Update
            </button>
          ) : (
            <button id="addbtn" onClick={HandelOnAdd}>
              Add
            </button>
          )}
        </form>
      </div>

      {todos.length > 0 ? (
        todos.map((item) => {
          return (
            <div>
              <div className="todo-container">
                <div className="main-container">
                  <div className="todoitem-container">
                    <h1>{item.name}</h1>
                    <h5>{item.discription}</h5>
                  </div>
                  <div
                    className="todo-delete"
                    style={{ width: "20%", marginleft: "30%" }}
                  >
                    <button
                      id="deletebtn"
                      onClick={() => HandelOnDelete(item.id)}
                    >
                      Delete
                    </button>
                    <button id="updatebtn" onClick={() => HandelOnUpdate(item)}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="todo-container">
          <div className="todoitem-container">
            <h3>No Data</h3>
          </div>
        </div>
      )}
    </>
  );
}
