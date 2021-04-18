import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";


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
    <div>
      <h1>Loan Calculator</h1>
      <p>{error}</p>
      <form onSubmit={handleSubmitValues}>
        {!results.isResult ? (
          //   Form to collect data from the user
          <div>
            <div>
              <TextField
                id="standard-basic"
                label="Amount:"
                name="amount"
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
                placeholder="years"
                value={userValues.years}
                onChange={handleInputChange}
              />
            </div>
            <Button variant="contained" type="submit" color="primary">
              Calculate
            </Button>
          </div>
        ) : (
          //   Form to display the results to the user
          <div>
            <h4>
              Loan amount: ${userValues.amount} <br />
              Interest:{userValues.interest}% <br />
              Years to repay: {userValues.years}
            </h4>
            <div>
              <TextField
                id="standard-basic"
                label="Monthly Payment:"
                value={results.monthlyPayment}
                disabled
              />
            </div>
            <div>
              <TextField
                id="standard-basic"
                label="Total Payment:"
                value={results.totalPayment}
                disabled
              />
            </div>
            <div>
              <TextField
                id="standard-basic"
                label="Total Interest:"
                value={results.totalInterest}
                disabled
              />
            </div>
          </div>
        )}
      </form>
      <Button variant="outlined" color="secondary" onClick={clearFields}>
         Calculate again
      </Button>
    </div>
  );
};

export default Calculator;


// import React, { useState } from "react";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";

// const Calculator = () => {
//   const [userValues, setUserValues] = useState({
//     amount: "",
//     interest: "",
//     years: "",
//   });

//   const [results, setResults] = useState({
//     monthlyPayment: "",
//     totalPayment: "",
//     totalInterest: "",
//     isResult: false,
//   });

//   const [error, setError] = useState("");

//   const handleInputChange = (event) =>
//     setUserValues({ ...userValues, [event.target.name]: event.target.value });

//   const handleSubmitValues = (e) => {
//     e.preventDefault();
//     if (isValid()) {
//       setError("");
//       calculateResults(userValues);
//     }
//   };

//   const calculateResults = ({ amount, interest, years }) => {
//     const userAmount = Number(amount);
//     const calculatedInterest = Number(interest) / 100 / 12;
//     const calculatedPayments = Number(years) * 12;
//     const x = Math.pow(1 + calculatedInterest, calculatedPayments);
//     const monthly = (userAmount * x * calculatedInterest) / (x - 1);

//     if (isFinite(monthly)) {
//       const monthlyPaymentCalculated = monthly.toFixed(2);
//       const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
//       const totalInterestCalculated = (
//         monthly * calculatedPayments -
//         userAmount
//       ).toFixed(2);

//       // Set up results to the state to be displayed to the user
//       setResults({
//         monthlyPayment: monthlyPaymentCalculated,
//         totalPayment: totalPaymentCalculated,
//         totalInterest: totalInterestCalculated,
//         isResult: true,
//       });
//     }
//     return;
//   };

//   const isValid = () => {
//     const { amount, interest, years } = userValues;
//     let actualError = "";
//     // Validate if there are values
//     if (!amount || !interest || !years) {
//       actualError = "All the values are required";
//     }
//     // Validade if the values are numbers
//     if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
//       actualError = "All the values must be a valid number";
//     }
//     // Validade if the values are positive numbers
//     if (Number(amount) <= 0 || Number(interest) <= 0 || Number(years) <= 0) {
//       actualError = "All the values must be a positive number";
//     }
//     if (actualError) {
//       setError(actualError);
//       return false;
//     }
//     return true;
//   };

//   const clearFields = () => {
//     setUserValues({
//       amount: "",
//       interest: "",
//       years: "",
//     });

//     setResults({
//       monthlyPayment: "",
//       totalPayment: "",
//       totalInterest: "",
//       isResult: false,
//     });
//   };

//   return (
//     <div>
//       <h1>Loan Calculator</h1>
//       <p>{error}</p>
//       <form onSubmit={handleSubmitValues}>
//         {!results.isResult ? (
//           //   Form to collect data from the user
//           <div>
//             <div>
//               <TextField
//                 id="standard-basic"
//                 label="Amount:"
//                 name="amount"
//                 placeholder="Loan amount"
//                 value={userValues.amount}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <TextField
//                 id="standard-basic"
//                 label="Interest:"
//                 name="interest"
//                 placeholder="Interest"
//                 value={userValues.interest}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <TextField
//                 id="standard-basic"
//                 label="years:"
//                 name="years"
//                 placeholder="years"
//                 value={userValues.years}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <Button variant="contained" color="primary" onClick={clearFields}>
//               Calculate
//             </Button>
//           </div>
//         ) : (
//           //   Form to display the results to the user
//           <div>
//             <h4>
//               Loan amount: ${userValues.amount} <br />
//               Interest:{userValues.interest}% <br />
//               Years to repay: {userValues.years}
//             </h4>
//             <div>
//               <label>Monthly Payment:</label>
//               <TextField
//                 id="standard-basic"
//                 label="Standard"
//                 value={results.monthlyPayment}
//                 disabled
//               />
//             </div>
//             <div>
//               <label>Total Payment: </label>
//               <TextField
//                 id="standard-basic"
//                 label="Total Payment:"
//                 value={results.totalPayment}
//                 disabled
//               />
//             </div>
//             <div>
//               <label>Total Interest:</label>
//               <TextField
//                 id="standard-basic"
//                 label="Standard"
//                 value={results.totalInterest}
//                 disabled
//               />
//             </div>
//           </div>
//         )}
//       </form>
//       <Button variant="outlined" color="secondary" onClick={clearFields}>
//         Calculate again
//       </Button>
//     </div>
//   );
// };

// export default Calculator;