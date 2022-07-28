import React, {useState} from "react";

function ToyForm({ toys, setToys }) {

  const [name, setName] = useState("")
  const [image, setImage] = useState("")

  function handleNameChange (event) {
    setName(event.target.value)
  }

  function handleImageChange (event) {
    setImage(event.target.value)
  }

function handleSubmit (event) {
  event.preventDefault();
  const formData = {
    name: name,
    image: image,
    likes: 0
  }

  const configObj ={
    method: "POST",
    headers: {
      "Content-Type": "application/type"
    },
    body: JSON.stringify(formData)
  }

  fetch("http://localhost:3001/toys", configObj)
  .then(data => data.json())
  .then(data => {
    console.log(data)
    const dataArray = [...toys, data]
    setToys(dataArray);
    setName("");
    setImage("");
  })
}

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          onChange={handleNameChange}
          value={name}
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          onChange={handleImageChange}
          value={image}
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
