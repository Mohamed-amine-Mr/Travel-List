import "./index.css";
import { useState } from "react";
function App() {
  const [description,setDescription]=useState("");
  const [quantity,setQuantity]=useState(1);
  const [items,setItems]=useState([]);

let handleDescription =(e) => setDescription(e.target.value)
let handleQuantity =(e) => setQuantity(Number(e.target.value))
function handleSubmit(e){
    e.preventDefault();
    
    setDescription("");
    setQuantity(1);

    let newItem={id:Date.now(),description,quantity}
    setItems([...items,newItem]);
  }
 
  return (
    <div className="app">
      <h1>🌴 Farm Away 💼</h1>
      <Form 
        onSubmit={handleSubmit} 
        quantity={quantity}
        description={description}
        handleQuantity={handleQuantity}
        handleDescription={handleDescription}/>
      <PackingList items={items}/>
      <Stats />
    </div>
  );
}

function Form({ onSubmit, handleQuantity, quantity, description, handleDescription }) {
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        onChange={handleQuantity}
        value={quantity}
      > 
        {/* we add Number() because e.target.value return string and we want number */}
        {Array.from({ length: 20 }, (_, i) => (
          <option value={i + 1} key={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
        <input
        value={description}
        type="text"
        placeholder="Item..."
        onChange={handleDescription}
      />     
      <button>Add</button>
    </form>
  );
}

function PackingList({items}) {
  return (
    <div className="list">
      <ul>
        {items.map(item=><Item item={item}key={item.id}/>)}
        
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

function Item({item}) {
  return (
    <li>
      <input type="checkbox" />
      <span>{item.quantity} {item.description}</span>
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
