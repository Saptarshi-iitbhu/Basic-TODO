import React from 'react'

function CreateToDo() {
  return (
    <div>
        <input type="text" placeholder='Title'></input> <br />
        <input type="text" placeholder='Description'></input> <br />
        <button>Add Todo</button>
    </div>
  )
}

export default CreateToDo