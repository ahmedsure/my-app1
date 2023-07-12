/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import currencyFormatter from "@/app/helpers/currencyFormatter";
import React, { useContext } from "react";
import { navigationCTX } from "../app";
import Navs from "@/app/helpers/navigations";


const HouseRow = ({ house }:any): React.JSX.Element => {
    const {nav} = useContext(navigationCTX);
    return (
        <tr style={{ cursor: 'pointer' }}>
            <td>{house.id}</td>
            <td>{house.address}</td>
            <td>{house.country}</td>
            <td className={house.price < 750000 ? 'text-primary' : 'text-danger'}>{currencyFormatter(house.price, 'EGP', 0)}</td>
            <td >
                {
                    house.photoUrl && house.photoUrl.length > 1 &&
                    <img height={50}
                        width={50}
                        src={'./images/houses/' + house.photoUrl + '.jpeg'}>
                    </img>
                }
            </td>
            <td>{house.bidders?.length}</td>
            <td >
                {
                    house.price && house.price > 0 && <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => nav?.navigate(Navs.houseDt , house)}>View</button>
                }
            </td>
        </tr>
    );
};

const HouseRowAsMemo = React.memo(HouseRow);

export default HouseRow;
export { HouseRowAsMemo };