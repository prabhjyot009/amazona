// This file contains all the utility functions used in the app and is imported into the App.js file in the frontend folder. The functions are exported as named exports. The getError function is used to get the error message from the error object. The error object is passed as an argument to the function. The error object is returned from the axios request. The error object contains the response object. The response object contains the data object. The data object contains the message property. If the error object contains the response object and the response object contains the data object and the data object contains the message property, then the message property is returned. Otherwise, the error message is returned.
export const getError = (error) => {
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  };