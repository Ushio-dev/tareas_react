import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('')

  useEffect(() => {
    axios.get("https://frank-prueba.onrender.com/tareas").then((response) => {
      console.log(response.data);
      setTasks(response.data);
    });

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name)
    await axios.post("https://frank-prueba.onrender.com/tareas", {
      name: name
    })
    .then(function (response){
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
    window.location.href = window.location.href;
  }

  const handleDelete = async (e) => {
    console.log(e)
    await axios.delete(`https://frank-prueba.onrender.com/tareas/${e}`)
    window.location.href = window.location.href;
  }

  return (
    
      <div class="container col-md-4 offset-md-4">
        <form class="mb-3 row" onSubmit={handleSubmit} method='post'>
          <h4>Nueva Tarea</h4>
          <input onChange={(e) => setName(e.target.value)}  name='tarea' className='form-control' type='text'/>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className='btn btn-primary' type='submit'>Agregar</button>
          </div>
        </form>
        <table class="table">
          <thead>
            <tr>
              <th>TAREA</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { tasks.map((task) => (
            <tr>
              <td style={{fontSize:19}}>{task.name}</td>
              <td>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button onClick={() => handleDelete(task.id)} className="btn btn-danger">Eliminar</button>
                </div>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default App;
