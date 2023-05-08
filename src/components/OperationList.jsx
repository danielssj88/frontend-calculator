import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material";
import CalculateIcon from '@mui/icons-material/Calculate';

const OperationList = ({ operations }) => {
	return (
    <Paper className="operation-costs-list">
      <h3>Operation Costs</h3>
      <ul>
        {operations.map((operation) => (
          <li key={operation.id}>
            <span>{operation.type}</span>
            <p>{operation.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          </li>
        ))}
      </ul>
    </Paper>
  );
}

export default OperationList;
