'use client'
import Banner from "./banner";
import 'bootstrap/dist/css/bootstrap.css'
import React, { useCallback, useRef, useState } from "react";
import Navs from "../helpers/navigations";
import HousesWrapper from "./houses/housesWrapper";

const navigationCTX = React.createContext({nav:Navs.home})

const AppComponent = () => {
    let constCNave = useRef(Navs.home);
    const navigate = useCallback(
        (navTo: string, param: any) => { 
            constCNave.current = navTo;
            setNav({ currentNav: navTo, param, navigate })
         },
        [constCNave]);

    const [nav, setNav] =
        useState({ currentNav: Navs.home, navigate });

    return (
        <navigationCTX.Provider value={ {nav }}>
            <div className="container">
                <Banner
                    headerText="Providing Houses Allover the world ... " />
                <HousesWrapper  currentNavLocation={nav}/> 
            </div>
        </navigationCTX.Provider>
    );
}
export { navigationCTX };
export default AppComponent;