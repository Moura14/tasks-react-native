import React, { useState } from 'react';
import Navigator from './src/Navigator';

export default function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (

        <Navigator></Navigator>
    
      
  )
}