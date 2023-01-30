
import './App.css';
import React from 'react';
import PageUser from './component/pageUser';
import Create from './component/create';
import {BrowserRouter,Route,Routes,} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <PageUser/>}/>
        <Route path="/create" element={ <Create/>}/>
      </Routes>
   
    </BrowserRouter>
    
   
  );
}

export default App;


