import { useEffect, useState } from "react";
import Calculator from "../components/Calculator";
import OperationList from "../components/OperationList";
import serviceCaller from "../services/serviceCaller";
import packageJson from '../../package.json';
import { Alert } from "@mui/material";
import { useSelector } from 'react-redux';
import axios from "axios";
import { cos } from "mathjs";

const Home = ({logout}) => {
  const [operations, setOperations] = useState([]);
  const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
  const username = useSelector((state) => state.session.username);
  const accessToken = useSelector((state) => state.session.accessToken);
  const currentBalance = useSelector((state) => state.session.currentBalance);

  useEffect(() => {
    function fetchOperations() {
      const headers = {
        Authorization: 'Bearer ' + accessToken,
      };
      
      axios.get(`${packageJson.services_url}/api/v1/operation`, { headers })
        .then(response => {
          setOperations(response.data);
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
    fetchOperations();
  }, []);

	return (
    <>
      <Alert severity={currentBalance > 0 ? 'success' : 'error'}>
        Your currrent Balance: {currentBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </Alert>
      <div>
        <h1>Welcome {username}</h1>
        <h2>{isLoggedIn}</h2>
      </div>
      <div className="calculator-container">
        <div>
          <Calculator logout={logout} operations={operations}></Calculator>
        </div>
        <div>
          <OperationList operations={operations} />
        </div>
      </div>
    </>
  );
}

export default Home;
