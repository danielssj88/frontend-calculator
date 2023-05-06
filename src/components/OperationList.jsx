import { Paper } from "@mui/material";

const OperationList = ({ operationCosts }) => {
	return (
    <Paper className="operation-costs-list">
      <h3>Operation Costs</h3>
      <ul>
        {operationCosts.map((operationCost) => (
          <li key={operationCost.id}>
            {operationCost.type} - {operationCost.cost}
          </li>
        ))}
      </ul>
    </Paper>
  );
}

OperationList.defaultProps = {
  operationCosts: [
    {
      "id": 1,
      "type": "addition",
      "cost": 10.0
    },
    {
      "id": 2,
      "type": "substraction",
      "cost": 10.0
    },
    {
        "id": 3,
        "type": "multiplication",
        "cost": 15.0
    },
    {
        "id": 4,
        "type": "division",
        "cost": 20.0
    },
    {
        "id": 5,
        "type": "square_root",
        "cost": 25.0
    },
    {
        "id": 6,
        "type": "random_string",
        "cost": 5.0
    }
  ]
};

export default OperationList;
