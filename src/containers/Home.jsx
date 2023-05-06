import Calculator from "../components/Calculator";
import OperationList from "../components/OperationList";

const Home = () => {
  /**
  try {
    const operations = await serviceCaller.get(`${packageJson.services_url}/operations`, { signal: request.signal });
    debugger;
  }
  catch (error) {
    debugger;
    if (error.response.status === 405) {
      logout();
    }
  }
   */

	return (
    <div className="calculator-container">
      <div>
        <Calculator></Calculator>
      </div>
      <div>
        <OperationList />
      </div>
    </div>
  );
}

export default Home;
