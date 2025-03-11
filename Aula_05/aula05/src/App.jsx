import { useEffect, useState } from "react";
import Avatar from "./Avatar"

function App() {
  const[x, setX] = useState(10);
  
  // Executa uma função quando o valor de x for alterado
  useEffect(()=>{
    if(x > 15){
      alert("Passou de 15");
    }
  },[x]);

  return (
    <>
      <h1>{x}</h1>
      <Avatar url="https://placehold.co/150x150" alt="Foto 150x150"/>
      <Avatar url="https://placehold.co/50x50" alt="Foto 50x50"/>
      <button onClick={() => setX(x+1)}>+</button> 
    </>
  )
}

export default App // Permite o import do App em outro código