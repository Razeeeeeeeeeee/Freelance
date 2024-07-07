import { AppContext } from "./StateContext";
import { useState } from "react";

const AppProvider = ({ children }) =>{ 
  const [Algotype, setAlgotype] = useState("skill");
  const [Algo, setAlgo] = useState("random");
  
  return (
    <AppContext.Provider value={{Algo, Algotype, setAlgo, setAlgotype}}>
  
      {children}

    </AppContext.Provider>
  )
}


export default AppProvider;


