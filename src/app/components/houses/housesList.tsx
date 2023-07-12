'use client'

import React, { useCallback, useState } from "react";
import { HouseRowAsMemo } from "./HouseRow";
import ApplicationLoader from "../common/appLoader";
import { fakeAddHousesData } from "@/app/helpers/fakeHousesApi";
import {  of, takeLast,debounceTime , distinctUntilChanged , delay } from "rxjs";
import { tap} from 'rxjs/operators';



const HousesList = (
    { pageNumber, cPageItems, pageSize, isLoading, setIsLoading,
        setCurrentPageNum, pages, setCurrentPageSize, filterKeyWord,
        setFilter }: any) => {

    const addNewHouseCall = useCallback(async()=>{
        setIsLoading(true);
        const copy = [...cPageItems];
        const newHouse = {
            id: copy?.length + 1,
            address: `${Math.ceil( (copy?.length + 1) * Math.random() * 100) } New House Address `,
            country: "Switzerland", price: Math.ceil(900000 * Math.random() ),
            bidders:[]
        };
        const res = await fakeAddHousesData(newHouse);
        setIsLoading(false);
        return res;
    },[cPageItems, setIsLoading]);
    
    const [filterState , setFilterState] = useState(filterKeyWord??''); 
    const filterTableInfo = (_filterVal: string) => {
        of(_filterVal).pipe(
            debounceTime(1000),
            distinctUntilChanged((p, c) => p != c),
            tap(() => setFilterState(_filterVal)),
            delay(1000), takeLast(1)
        )
        .subscribe((v)=>{
            console.log({'EV:' :v});
            setFilter(_filterVal?.trim());
        });
    }

    const navToPage = (pageNum: number)=>{
        if(pageNumber == pageNum) return;
        setCurrentPageNum(pageNum)
    }
    
    const handlePageSize = (newPageSize:number)=>{
        if(newPageSize == pageSize) return;
        setCurrentPageSize(newPageSize);
    }

   if(isLoading)
   return  <ApplicationLoader isLoading/>
    return (<>
        <div className="row mb-2">
            <h5 className="themeFontColor text-center">
                Houses Currently on the Market
            </h5>
        </div>
        <div className="row">
            <div className="col-4">
                <button
                    className="btn btn-primary btn-sm"
                    onClick={addNewHouseCall}
                >{'Add House + ' }</button>
            </div>
        </div>
        <table
            className="table table-responsive table-hover" >
            <thead>
                <tr>
                    <td colSpan={7}>
                        <div className="row">
                            <input placeholder="search" 
                            value={filterState}  
                            onChange={(ev)=>filterTableInfo(ev.target.value)}></input>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>-</th>
                    <th>Address</th>
                    <th>Country</th>
                    <th>Asking Price</th>
                    <th> Photo </th>
                    <th> Bidders </th>
                    <th>Options </th>
                </tr>
            </thead>
            <tbody>
                {cPageItems?.map((h:any, idx) =>
                    (<HouseRowAsMemo key={idx + '_House'} house={...h} />)
                )}
            </tbody>
            <tfoot>
                <tr className="d-flex justify-content-center">
                    <td>PG : </td>
                    <td>
                        <div className="row">
                            <div className="col-9 d-flex justify-content-center">
                                {pages.map((p) =>
                                    <button key={'pageBtn' + p} value={p}
                                        onClick={() => { navToPage(p) }}
                                        className="p-2 m-2 btn btn-sm btn-secondary">{p}</button>
                                )}
                            </div>
                            <div className="col-3">
                                <select value={pageSize}  onChange={(ev)=>handlePageSize(ev.target.value??10)}>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>
                        </div>

                    </td>
                </tr>
            </tfoot>
        </table>
    </>
    );
}
export default HousesList;