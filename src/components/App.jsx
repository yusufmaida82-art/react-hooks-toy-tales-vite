import React, { useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET all toys on page load
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // POST: add the new toy to state
  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }

  // DELETE: remove the toy from state
  function handleDeleteToy(id) {
    setToys(toys.filter((toy) => toy.id !== id));
  }

  // PATCH: replace the updated toy, keeping the order
  function handleUpdateToy(updatedToy) {
    setToys(toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy)));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;