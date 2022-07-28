import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, setToys }) {

  function handleLike (id, like) {
    const configObj ={
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "likes": like + 1,
      })
    }

    fetch(`http://localhost:3001/toys/${id}`, configObj)
    .then(data => data.json())
    .then(data => {
      const newToys = [...toys]
      for (let i=0; i < newToys.length; i++) {
        const currToy = newToys[i]
        if (currToy.id === id) {
          currToy.likes = data.likes;
          break;
        }
      }
      setToys(newToys)
    })
  }


  function handleDelete (id) {
    const configObj ={
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    }

    fetch(`http://localhost:3001/toys/${id}`, configObj)
    .then(data => data.json())
    .then(data => {
      const newToys = [...toys]
      let toyIndex = 0
      for (let i=0; i < newToys.length; i++) {
        const currToy = newToys[i]
        if (currToy.id === id) {
          toyIndex = i;
          break;
        }
      }
      newToys.splice(toyIndex, 1)
      setToys(newToys);
    })
  }

  const displayToys = toys.map(toy => {
  return (
    <ToyCard 
      key={toy.id} 
      toy={toy} 
      handleDelete={handleDelete} 
      handleLike={handleLike} />
  )})
  
  return (
    <div id="toy-collection">{displayToys}</div>
  );
}

export default ToyContainer;
