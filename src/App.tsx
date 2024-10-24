import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Formulario from './Components/Formulario'
import Counter from './Components/ReducerCounter'
import CheckboxComponent from './Components/ToDoList'
import Filtro from './Components/Filtro'
import ListaFiltro from './Components/Filtro'
import TodoList from './Components/ToDoList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <Formulario/>
      <Counter/>
      <CheckboxComponent></CheckboxComponent> */}
      {/* <ListaFiltro items={['div1','div2','div3']}/> */}
<TodoList></TodoList>

    </>
  )
}

export default App
