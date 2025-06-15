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
    if(!description)return;
    
    setDescription("");
    setQuantity(1);

    let newItem={id:Date.now(),description,quantity,packed:false}
    setItems([...items,newItem]);
  }
  
  function togglePacked(idToRemove){
    setItems(items.map(item=>
    item.id ===idToRemove? {...item,packed:!item.packed}:item 
    ))
  }
  function deleteItem(idToRemove){
  setItems(items.filter(item=>item.id!==idToRemove))
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
      <PackingList items={items} deleteItem={deleteItem} togglePacked={togglePacked}/>
      <Stats items={items}/>
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

function PackingList({items,deleteItem,togglePacked={togglePacked}}) {
  return (
    <div className="list">
      <ul >
        {items.map(item=>
        <Item 
        item={item}
        key={item.id}
        deleteItem={deleteItem}
        togglePacked={togglePacked}
        />)}
        
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

function Item({item,deleteItem,togglePacked}) {
  return (
    <li>
      <input type="checkbox"value={item.packed} onChange={()=>togglePacked(item.id)}/>    
      <span className="select"style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
      <button onClick={() => deleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({items}) {
const numItems = items.length;
const numPacked = items.filter(item=>item.packed).length;
console.log(numPacked);

  return (
    <footer className="stats">
    <em>💼 You have {numItems} items on your list, and you already packed {numPacked}%</em>
      {/* <em>Start adding items to your packing list 🚀</em> */}
    </footer>
  );
}

export default App;
