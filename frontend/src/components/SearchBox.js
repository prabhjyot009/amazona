import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';//importing react-bootstrap components
import FormControl from 'react-bootstrap/FormControl';//importing react-bootstrap components
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {//SearchBox is a function that takes in no arguments
  const navigate = useNavigate();//navigate is a variable that is equal to the useNavigate function
  const [query, setQuery] = useState('');//query is a variable that is equal to the useState function
  const submitHandler = (e) => {//submitHandler is a function that takes in an object as an argument
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (//returning the following jsx code to the caller of this function which is equal to the SearchBox object's __proto__ property which is equal to the function's prototype property which is equal to an object that has a constructor property which is equal to the SearchBox function
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search products..."
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}