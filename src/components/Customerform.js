import React, { useState, useEffect } from 'react';
function CustomerForm({
  mode,
  formObject,
  handleInputChange,
  onSaveClick,
  onDeleteClick,
  onCancelClick,
}) {
//Create use state variables for hiding password 
  const [isPassVisible, setIsPassVisible] = useState(false);

// Reset isPassVisible to false when clicking new name or cancel button
  useEffect(() => {
    setIsPassVisible(false);
  }, [formObject.id, mode]);


// Sets up a toggle function for hiding password
  const togglePassword = () => {
    setIsPassVisible((prev) => !prev);
  };

  // Determine the value to display in the password field
  const passwordDisplayValue =
    mode === 'Update' && !isPassVisible ? '******' : formObject.password;

    // Form for adding and changing user info. Has button for showing/hiding password

  return (
    <div className="boxed">
      <div>
        <h4>{mode}</h4>
      </div>
      <form>
        <table id="customer-add-update">
          <tbody>
            <tr>
              <td className="label">Name:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  value={formObject.name}
                  placeholder="Customer Name"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="label">Email:</td>
              <td>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  value={formObject.email}
                  placeholder="name@company.com"
                />
              </td>
            </tr>
            <tr>
              <td className="label">Pass:</td>
              <td>
                <div className="password-container">
                  <input
                    type={isPassVisible ? 'text' : 'password'}
                    name="password"
                    onChange={handleInputChange}
                    value={passwordDisplayValue}
                    placeholder="password"
                    className={mode === 'Update' && !isPassVisible ? 'masked' : ''}
                  />
                  {mode === 'Update' && (
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={togglePassword}
                    >
                      {isPassVisible ? 'Hide' : 'Show'}
                    </button>
                  )}
                </div>
              </td>
            </tr>
            <tr className="button-bar">
              <td colSpan="2">
                <input type="button" value="Delete" onClick={onDeleteClick} />
                <input type="button" value="Save" onClick={onSaveClick} />
                <input type="button" value="Cancel" onClick={onCancelClick} />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default CustomerForm;