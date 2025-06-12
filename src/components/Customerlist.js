import React from 'react';
import './List.css';
//Password field is masked to not show password. 
function CustomerList({ customers, formObject, handleListClick }) {
  return (
    <div className="boxed">
      <h4>Customer List</h4>
      <table id="customer-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Pass</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((item) => (
            <tr
              key={item.id}
              className={item.id === formObject.id ? 'selected' : ''}
              onClick={() => handleListClick(item)}
            >
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td className="masked">******</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;