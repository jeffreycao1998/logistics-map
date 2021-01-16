import React from 'react';
import styled from 'styled-components';
import { ShipmentType, RouteType } from '../../types';

// components
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AddRoute from './AddShipment';
import RouteDetails from './RouteDetails';

const Container = styled.div`
  width: 400px;
  height: 100vh;
  border-left: 1px solid grey;
`;

const Navigation = styled.ul`
  display: flex;
  border-bottom: 1px solid grey;
`;

const NavTab = styled(Link)`
  list-style: none;
  padding: 20px 40px;
  border-right: 1px solid grey;
  text-decoration: none;
  cursor: pointer;
`
type Props = {
  shipments: Array<ShipmentType>
  setShipments: React.Dispatch<React.SetStateAction<Array<ShipmentType>>>
  setRoutes: React.Dispatch<React.SetStateAction<Array<RouteType>>>
}

const Sidebar = ({ shipments, setShipments, setRoutes }: Props) => {
  return (
    <Router>
      <Container>
        <Navigation>
          <NavTab to='/create'>Home</NavTab>
          <NavTab to='/info'>Info</NavTab>
        </Navigation>

        <Switch>
          <Route path='/info'>
            <RouteDetails shipments={shipments}/>
          </Route>
          <Route path='/'>
            <AddRoute setShipments={setShipments} setRoutes={setRoutes}/>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default Sidebar;