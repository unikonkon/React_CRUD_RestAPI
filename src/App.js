
import './App.css';
import React from 'react';
import PageUser from './component/pageUser';
import Update from './component/upDate';
import Create from './component/create';
import {BrowserRouter,Route,Routes,} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <PageUser/>}/>
        <Route path="/create" element={ <Create/>}/>
        <Route path='/update/:id' element={ <Update/>}/>
      </Routes>
   
    </BrowserRouter>
    
   
  );
}

export default App;


