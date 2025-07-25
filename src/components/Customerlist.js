import React, { useState, useEffect } from 'react';
function Customerlist({ customers, formObject, handleListClick }) {
   
return (
     <div className="boxed" >
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
            {customers.map(
              (item, index) => {
                return (<tr key={item.id} 
                className={ (item.id === formObject.id )?'selected': ''} 
                onClick={()=>handleListClick(item)} 
                >
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>******</td>
                </tr>);
              }
            )}
          </tbody>
        </table>
      </div>
    )
}
export default Customerlist;