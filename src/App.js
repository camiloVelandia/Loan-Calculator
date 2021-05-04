import React from "react";
import Calculator from "./components/Calculator";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Container maxWidth="lg" className='container'>
      <Calculator />
    </Container>
  );
}

export default App;
