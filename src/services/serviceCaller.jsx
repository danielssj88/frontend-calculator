import axios from 'axios';

const serviceCaller = axios.create({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }
});

export default serviceCaller;
