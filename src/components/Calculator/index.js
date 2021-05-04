import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import {
  Section,
  Title,
  Error,
  Form,
  ButtonStyled,
  Result,
  ToPay,
} from "./styles";

const Calculator = () => {
  const [userValues, setUserValues] = useState({
    amount: "",
    interest: "",
    years: "",
  });

  const [results, setResults] = useState({
    monthlyPayment: "",
    totalPayment: "",
    totalInterest: "",
    isResult: false,
  });

  const [error, setError] = useState("");

  const handleInputChange = (event) =>
    setUserValues({ ...userValues, [event.target.name]: event.target.value });

  const handleSubmitValues = (e) => {
    e.preventDefault();
    if (isValid()) {
      setError("");
      calculateResults(userValues);
    }
  };

  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = Number(amount);
    const calculatedInterest = Number(interest) / 100 / 12;
    const calculatedPayments = Number(years) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (
        monthly * calculatedPayments -
        userAmount
      ).toFixed(2);

      // Set up results to the state to be displayed to the user
      setResults({
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        isResult: true,
      });
    }
    return;
  };

  const isValid = () => {
    const { amount, interest, years } = userValues;
    let actualError = "";
    // Validate if there are values
    if (!amount || !interest || !years) {
      actualError = "All the values are required";
    }
    // Validade if the values are numbers
    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
      actualError = "All the values must be a valid number";
    }
    // Validade if the values are positive numbers
    if (Number(amount) <= 0 || Number(interest) <= 0 || Number(years) <= 0) {
      actualError = "All the values must be a positive number";
    }
    if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  };

  const clearFields = () => {
    setUserValues({
      amount: "",
      interest: "",
      years: "",
    });

    setResults({
      monthlyPayment: "",
      totalPayment: "",
      totalInterest: "",
      isResult: false,
    });
  };

  return (
    <Section>
      <Title>Loan Calculator</Title>
      <Error>{error}</Error>
      <Form onSubmit={handleSubmitValues}>
        {!results.isResult ? (
          //   Form to collect data from the user
          <div>
            <div>
              <TextField
                id="standard-basic"
                label="Amount:"
                name="amount"
                fullWidth={true}
                placeholder="Loan amount"
                value={userValues.amount}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                id="standard-basic"
                label="Interest:"
                name="interest"
                fullWidth={true}
                placeholder="Interest"
                value={userValues.interest}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                id="standard-basic"
                label="Interest:"
                name="years"
                fullWidth={true}
                placeholder="years"
                value={userValues.years}
                onChange={handleInputChange}
              />
            </div>
            <ButtonStyled variant="contained" type="submit" color="primary">
              Calculate
            </ButtonStyled>
          </div>
        ) : (
          //   Form to display the results to the user
          <div>
            <Result>
              Loan amount: <span> ${userValues.amount} </span>
            </Result>
            <Result>
              Interest: <span>{userValues.interest}% </span>
            </Result>
            <Result>
              Years to repay: <span> {userValues.years} </span>
            </Result>
            <ToPay>
              <div>
                <TextField
                  id="standard-basic"
                  label="Monthly Payment:"
                  fullWidth={true}
                  value={results.monthlyPayment}
                  disabled
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  fullWidth={true}
                  label="Total Payment:"
                  value={results.totalPayment}
                  disabled
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="Total Interest:"
                  fullWidth={true}
                  value={results.totalInterest}
                  disabled
                />
              </div>
            </ToPay>
          </div>
        )}
      </Form>
      <Button variant="outlined" color="secondary" onClick={clearFields}>
        Calculate again
      </Button>
    </Section>
  );
};

export default Calculator;
