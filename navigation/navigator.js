import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from '../Screens/Home';
import Login from '../Screens/Login';

const Navigator = createStackNavigator({
   login:Login, 
   home:Home
},{
    headerMode:'none'
});

export default createAppContainer(Navigator);