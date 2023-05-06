import { Alert, Button, FormControl, Paper, TextField } from "@mui/material";
import React, { useState } from "react";

// All the actions supported by the calculator
const actions = [
  'AC', '\u232B', '\u221A', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', 'STR', '=', 
];

const Calculator = () => {
  const [command, setCommand] = useState('');
  const [operation, setOperation] = useState('');
  const [enableArithmeticButtons, setEnableArithmeticButtons] = useState('');
  const [error, setError] = useState('');
  const [disableCalculator, setDisableCalculator] = useState(false);

  // Define the event of each action
  const getEvent = (action) => {
    switch(action) {
      case 'AC':
        return () => {
          setDisableCalculator(false);
          setCommand('');
          setOperation('');
        };
      case 'STR':
        return () => {
          setOperation(':str');
        };
      case '\u221A': {
        return () => {
          setOperation('\u221A');
        };
      };
      case '\u232B':
        return () => {
          deleteTerm();
        };
      case '=':
        return () => {
          calculate();
        };
      default:
        return () => {
          debugger;
          setOperation(operation === ':str' || operation === '0' ? action : operation + action);
        };
    }
  };

  const hasArithmeticSymbols = (str) => {
    const arithmeticSymbols = /[+\-*/\u221A]/;
    return arithmeticSymbols.test(str);
  };

  React.useEffect(() => {
    setEnableArithmeticButtons(hasArithmeticSymbols(operation));
  }, [operation]);

  const calculate = () => {
    setCommand(operation);
    setOperation('result');
    setDisableCalculator(true);
  };

  const deleteTerm = () => {
    if (operation === ':str')
      setOperation('');
    else
      setOperation(operation.substring(0, operation.length - 1));
  };
	return (
		<Paper className="calculator">
			<h1>Calculator</h1>
      <Alert severity="info">
        <h3>Balance:</h3>
        <p>$10,000</p>
        <h3>Operation cost:</h3>
        <p>$1,000</p>
      </Alert>
			<FormControl fullWidth sx={{ m: 1 }}>
				<TextField
          id='operation-field'
          label={command}
          value={operation}
          error={Boolean(error)}
          helperText={error}
          multiline
          disabled={disableCalculator}
          onChange={(event, a, b, c, d) => {
            return false;
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !Boolean(error) ) {
              calculate();
            }
          }}
				/>
			</FormControl>
      <div className="buttons">
        <>
        {actions.map((action)=> {
          return <Button key={action} variant="contained" disabled={
            (action != 'AC' && disableCalculator) || 
            (hasArithmeticSymbols(action) && enableArithmeticButtons)
          } onClick={() => {
            getEvent(action)();
          }}>{action}</Button>
        })}
        </>
      </div>
		</Paper>
	);
};

export default Calculator;
