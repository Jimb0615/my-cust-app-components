import React, { useState, useEffect } from 'react';
import { getAll, post, put, deleteById } from './memdb.js';
import CustomerList from './components/Customerlist.js';
import CustomerForm from './components/Customerform.js';


function log(message) {
  console.log(message);
}

export function App() {
  const blankCustomer = { id: -1, name: '', email: '', password: '' };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);

  const mode = formObject.id >= 0 ? 'Update' : 'Add';

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    log('in getCustomers()');
    setCustomers(getAll());
  };

  const handleListClick = (item) => {
    log('in handleListClick()');
    setFormObject(item.id === formObject.id ? blankCustomer : item);
  };

  const handleInputChange = (event) => {
    log('in handleInputChange()');
    const { name, value } = event.target;
    setFormObject((prev) => ({ ...prev, [name]: value }));
  };

  const onCancelClick = () => {
    log('in onCancelClick()');
    setFormObject(blankCustomer);
  };

  const onDeleteClick = () => {
    if (formObject.id >= 0) {
      deleteById(formObject.id);
      getCustomers();
    }
    setFormObject(blankCustomer);
  };

  const onSaveClick = () => {
    if (mode === 'Add') {
      post(formObject);
    } else if (mode === 'Update') {
      put(formObject.id, formObject);
    }
    getCustomers();
    setFormObject(blankCustomer);
  };

  return (
    <div>
      <CustomerList
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