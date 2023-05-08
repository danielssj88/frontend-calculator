import { Alert, Button, FormControl, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import serviceCaller from "../services/serviceCaller";
import packageJson from '../../package.json';
import { useSelector } from "react-redux";
import axios from "axios";
import { updateBalance } from "../store/sessionSlice";
import { useDispatch } from 'react-redux';

// All the actions supported by the calculator
const actions = [
  'AC', '\u232B', '\u221A', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', 'STR', '=', 
];

const Calculator = ({logout, operations}) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.session.accessToken);
  const [command, setCommand] = useState('');
  const [statement, setStatement] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [disableCalculator, setDisableCalculator] = useState(false);
  const [operationSelected, setOperationSelected] = useState('');

  // Define the event of each action
  const getEvent = (action) => {
    switch(action) {
      case 'AC':
        return () => {
          setDisableCalculator(false);
          setCommand('');
          setStatement('');
          setResult('');
        };
      case 'STR':
        return () => {
          setStatement(':str');
        };
      case '\u221A': {
        return () => {
          setStatement('\u221A');
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
          setStatement(statement === ':str' || statement === '0' ? action : statement + action);
        };
    }
  };

  const reviewOperation = () => {
    if (statement.indexOf('+') !== -1) {
      setOperationSelected('addition');
    }
    else if (statement.indexOf('-') !== -1) {
      setOperationSelected('substraction');
    }
    else if (statement.indexOf('*') !== -1) {
      setOperationSelected('multiplication');
    }
    else if (statement.indexOf('/') !== -1) {
      setOperationSelected('division');
    }
    else if (statement.indexOf('\u221A') !== -1) {
      setOperationSelected('square_root');
    }
    else if (statement.indexOf('random_string') !== -1) {
      setOperationSelected('random_string');
    }
    else {
      setOperationSelected('');
    }
  };

  const hasArithmeticSymbols = (str) => {
    const arithmeticSymbols = /[+\-*/\u221A]/;
    return arithmeticSymbols.test(str);
  };

  React.useEffect(() => {
    reviewOperation();
  }, [statement]);

  function saveOperation() {
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    
    axios.post(`${packageJson.services_url}/api/v1/operation`, {statement: statement}, { headers })
      .then(response => {
        setResult(response.data.result);
        dispatch(updateBalance(response.data.balance));
      })
      .catch(error => {
        if (error.response.status === 405 || error.response.status === 401) {
          logout();
        }
        else {
          alert(JSON.stringify(error.response.data));
        }
      });
  }

  const calculate = () => {
    setCommand(statement);
    setDisableCalculator(true);
    saveOperation();
  };

  const deleteTerm = () => {
    if (statement === ':str')
      setStatement('');
    else
      setStatement(statement.substring(0, statement.length - 1));
  };

	return (
		<Paper className="calculator">
      {!!operationSelected &&
      <Alert severity="info">
        Statement cost: {operations.filter(
          op => op.type == operationSelected)[0]
          .cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </Alert>}
			<FormControl fullWidth sx={{ m: 1 }}>
				<TextField
          id='statement-field'
          label={command}
          value={result || statement}
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
            (action !== 'AC' && disableCalculator) || 
            // (!!operationSelected)
            (hasArithmeticSymbols(action) && !!operationSelected)
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
