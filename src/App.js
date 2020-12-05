import React, { useRef, useState } from 'react';
import './App.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const Todolist = () => {
  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);

  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  };

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, todo]);
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex))
    }
    
    else {
      alert('Select a row first');
    }
  };

  const columns = [
    { headerName: 'Description', field: 'description', sortable: true, filter: true, floatingFilter: true },
    { headerName: 'Date', field: 'date', sortable: true, filter: true, floatingFilter: true },
    { headerName: 'Priority', field: 'priority', sortable: true, filter: true, floatingFilter: true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Todolist</h1>
      </header>
      <div class="todos">
        <form onSubmit={addTodo}>
          <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
          <input type="date" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/>
          <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/>

          <input type="submit" value="Add"/>
          <button onClick={deleteTodo}>Delete</button>
          
        </form>
      </div>
      <div className="ag-theme-material" style={ { height: '700px', width: '80%', margin: 'auto'} }>
        <AgGridReact
          ref={gridRef}
          onGridReady={ params => gridRef.current = params.api }
          rowSelection="single"
          columnDefs={columns}
          rowData={todos}
          animateRows={true}>  
        </AgGridReact> 
      </div> 
    </div>
  );
};

export default Todolist;