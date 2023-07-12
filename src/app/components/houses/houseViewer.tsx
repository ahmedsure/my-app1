/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import currencyFormatter from "@/app/helpers/currencyFormatter";
import { useContext } from "react";
import { navigationCTX } from "../app";
import Navs from "@/app/helpers/navigations";
import HouseBidders from "./houseBidders";


const HouseViewer = () => {
    const ctxValues  = useContext(navigationCTX);
    const {navigate,param} = ctxValues?.nav;

    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <img className="img-fluid"
                        src={param.photoUrl ? `./images/houses/${param.photoUrl}.jpeg` : ''}
                        width="100%"
                        height="100%"
                        rel="Image not found "></img>
                </div>
            </div>

            <div className="col-12 mt-5">
                <h1 className="row">{param.country}</h1>
                <p className={param.price < 750000 ? 'text-primary' : 'text-danger'}>{currencyFormatter(param.price, 'EGP', 0)}</p>
                <h3>{param.address}</h3>
                <p className="text-primary">Lorem ipsum dolor sit amet,
                 consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, 
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident,
                   sunt in culpa qui officia deserunt mollit anim id est laborum.
                   </p>
            </div>
            <hr></hr>
            <br/>
           <HouseBidders ></HouseBidders>
            <div className="col-12 mt-5">
               <button 
               className="btn btn-secondary"
               onClick={() => navigate(Navs.home)}>Back  </button>
            </div>    
        </div>
    );
}

export default HouseViewer;