'use client'
import useHouses from "../hooks/useHouses";
import HouseViewer from "./houseViewer";
import HousesList from "./housesList";
import Navs from "@/app/helpers/navigations";
const HousesWrapper = ({currentNavLocation}:any)=>{

    const { currentPageNum, pageSize, currentPageItems,isLoading, setIsLoading , 
            setCurrentPageNum , pages , setPageSize ,
            filter, setPageFilter} = useHouses();
    switch (currentNavLocation?.currentNav) {
        case Navs.home:
            return <HousesList pageNumber={currentPageNum} 
                               cPageItems={currentPageItems}
                               pageSize={pageSize} 
                               isLoading={isLoading}
                               setIsLoading={setIsLoading}
                               setCurrentPageNum={setCurrentPageNum}
                               pages={pages}
                               setCurrentPageSize={setPageSize}
                               filterKeyWord={filter}
                               setFilter={setPageFilter}
                               />
    case Navs.houseDt:
        return <HouseViewer  />
        default:
           return (<h3 className="text-danger" >No component for {currentNavLocation} nav . found !!! </h3>)
    }

   
}

export default HousesWrapper;