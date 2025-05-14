import { Navigate } from 'react-router-dom';
import { networkObject } from '../components/networkData';
import { useNavigate } from 'react-router-dom';

const Protected_route = ({ children }) => {
//leaving this and handle everything on the homepage itself
   return children;

}

export default Protected_route;