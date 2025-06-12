import React, {useState, useEffect} from 'react';
import { getAll, post, put, deleteById } from './memdb.js' 
import CustomerForm from './components/Customerform.js';
import Customerlist from './components/Customerlist.js'
import './App.css';

function log(message){console.log(message);}

export function App(params) {
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';
  useEffect(() => { getCustomers() }, []);
  
  const getCustomers =  function(){
    log("in getCustomers()");
    log("in getCustomers()"); 
    setCustomers(getAll());
  }

  const handleListClick = function(item){
    log("in handleListClick()");
    //setFormObject(item);
    // modified with if/else to deselect on second click. 
    if (formObject.id === item.id)
        {setFormObject(blankCustomer)
      }
      else {setFormObject(item)
      }
  }  

  const handleInputChange = function (event) {
    log("in handleInputChange()");
    const name = event.target.name; 
    const value = event.target.value; 
    let newFormObject = {...formObject} 
    newFormObject[name] = value; 
    setFormObject(newFormObject); 
  }

  let onCancelClick = function () {
    log("in onCancelClick()");
    setFormObject(blankCustomer);
  }

  let onDeleteClick = function () {
    if(formObject.id >= 0){ 
      deleteById(formObject.id); 
    } 
    setFormObject(blankCustomer);
  }

  let onSaveClick = function () { 
    if (mode === 'Add') { 
        post(formObject); 
    } 
    if (mode === 'Update') { 
        put(formObject.id, formObject); 
    } 
    setFormObject(blankCustomer); 
  }

  return (
    <div>
      <Customerlist
        customers={customers}
        formObject={formObject}
        handleListClick={handleListClick}
      />  
   
      <CustomerForm
           mode={mode}
           formObject={formObject}
           handleInputChange={handleInputChange}
           onSaveClick={onSaveClick}
           onDeleteClick={onDeleteClick}
           onCancelClick={onCancelClick}
      />
    </div>  
  
  );
}

export default App;
