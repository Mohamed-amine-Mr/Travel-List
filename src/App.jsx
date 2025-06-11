import "./index.css";
import { useState } from "react";
function App() {
  return (
    <div className="app">
      <h1>🌴 Farm Away 💼</h1>
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Form() {
  const [description,setDescritpion]=useState("");
  const [quantity,setQuantity]=useState(1);
  
  function handleSubmit(e){
    e.preventDefault();
    setDescritpion("");
    setQuantity(1);

    let newItem={description,quantity}
    console.log(newItem);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>  
      <h3>What do you need for your trip?</h3>
      <select onChange={(e)=>setQuantity(Number(e.target.value))} value={quantity}>{/* we add Number() because e.target.value return string and we want number */}
        {Array.from({ length: 20 }, (_, i) => (
          <option value={i + 1} key={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input value={description} type="text" placeholder="Item..." onChange={(e)=>setDescritpion(e.target.value)}/>
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        <Item />
      </ul>
      <div className="actions">
        <select>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item() {
  return (
    <li>
      <input type="checkbox" />
      <span>1 Sample Item</span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>Start adding items to your packing list 🚀</em>
    </footer>
  );
}

export default App;
