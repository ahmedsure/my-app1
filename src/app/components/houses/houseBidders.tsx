'use client'
import { useContext, useState } from "react";
import { navigationCTX } from "../app";
import useHouses from "../hooks/useHouses";
import { fakeAddHouseBidder, fakeRemoveHouseBidder } from "@/app/helpers/fakeHousesApi";
import currencyFormatter from "@/app/helpers/currencyFormatter";


const HouseBidders = () => {
    const {setIsLoading} = useHouses();
    const ctxValues = useContext(navigationCTX);
    const { navigate, param } = ctxValues?.nav;
    console.log({ navigate, param })
    const [bidd, setBidd] = useState({ bidderName: '', biddingValue: param.price, ofHouse: param.id });
    const [bidders, setBidders] = useState(param.bidders ?param.bidders :Array.from([]));
    const changed = (eventOf: any) => { setBidd({ ...bidd, [eventOf?.target?.name]: eventOf?.target?.value }) }
    const handelAddingBidder = () => {
        const executer = async () => {
            if (bidd.ofHouse && bidd.biddingValue && bidd.bidderName?.length > 0) {
                if (!bidders.find((b) => b.bidderName == bidd.bidderName)) {
                    setIsLoading(true);
                    await fakeAddHouseBidder(bidd);
                    bidders.push(bidd);
                    setBidders([...bidders]);
                    setIsLoading(false);
                    param.bidders = [...bidders??[]];
                    const maxBidd = param.bidders?.length>0 ? param.price : Math.max(... param.bidders.map(b=>b.biddingValue) )
                    setBidd({ bidderName: '', biddingValue: maxBidd, ofHouse: param.id });
                }
            }
        }
        executer();
    }
    const handelRemoveBidder = (idx:number)=>{
        const executer = async () => {
            if (bidders) {
                const removing = bidders[idx];
                if (removing) {
                    setIsLoading(true);
                    await fakeRemoveHouseBidder(removing);
                    const  copy = [...bidders.filter(b=>b.bidderName != removing.bidderName)];
                    setBidders(copy);
                    setIsLoading(false);
                    param.bidders = [...copy??[]];
                    const maxBidd = param.bidders?.length>0 ? param.price : Math.max(... param.bidders.map(b=>b.biddingValue) )
                    setBidd({ bidderName: '', biddingValue: maxBidd, ofHouse: param.id });
                }
            }
        }
        executer();
    }
    return (<table className="table table responsive">
        <thead>
            <tr>
                <th>Bidder </th>
                <th>Amount </th>
                <th>.</th>
            </tr>
        </thead>
            <tbody>
                {bidders.map((b: HouseBidder,idx) =>
                    (<tr key={'bidder_'+b.bidderName}>
                        <td><span className="text text-primary">{b.bidderName}</span></td>
                        <td><span className="text text-danger">{currencyFormatter( b.biddingValue , 'EGP',0)}</span></td>
                        <td> <button className="btn btn-sm btn-danger" onClick={()=>handelRemoveBidder(idx)}>-</button></td>
                    </tr>)
                    )}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={3}><br></br></td>
                </tr>
                <tr>
                    <td colSpan={1}>
                        <input type="text" name="bidderName"
                            value={bidd.bidderName}
                            onChange={changed}
                        ></input>
                    </td>
                    <td colSpan={1}>
                        <input type="text" name="biddingValue"
                            value={bidd.biddingValue}
                            onChange={changed}
                        ></input>
                    </td>
                    <td colSpan={1}>
                        <button className="btn btn-sm btn-primary" onClick={handelAddingBidder}>+</button>
                    </td>

                </tr>
            </tfoot>
    </table>)
}

export default HouseBidders;


