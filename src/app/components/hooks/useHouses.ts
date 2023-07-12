import { fakeGetHousesData } from "@/app/helpers/fakeHousesApi";
import { useEffect, useRef, useState } from "react";
import useAppIsLoading from "./useAppIsLoading";
import '@/app/helpers/ArraysExtentions';

const useHouses = () => {
    const [currentHousesValue, setHouses] = useState([] as Array<any>);
    const [pageSize, setPageSize] = useState(10);
    const [currentPageItems, setCurrentPageItems] = useState([]);
    const [currentPageNum, setCurrentPageNum] = useState(0);
    const [filter, setPageFilter] = useState('');
    const { isLoading, setIsLoading } = useAppIsLoading();
    const [pages, setPages] = useState([1]);

    useEffect(() => {
        const caller = async () => {
            setIsLoading(true);
            const res = await fakeGetHousesData();
            // counter.current = counter.current == res.length ? counter.current : counter.current + res.length;
            setHouses(res);
            const pgS = (pageSize??10);
            const pgSkipping = currentPageNum > 1 ? Math.max(1,((currentPageNum ?? 0) - 1)) * pgS : 0;
            let takingElms =[];

            if (filter?.trim() == '' || !filter) {
                takingElms = res
                .arraySkip(pgSkipping)
                    .arrayTake(pgS);
            }
            else {
                takingElms = res
                    .filter(v =>   Object.keys(v).some(k => JSON.stringify( v[k] ).toLowerCase().includes( filter?.toLowerCase() ) ) )
                    .arraySkip(pgSkipping).arrayTake(pgS);
            }
            setCurrentPageItems([...takingElms]);
            const pagesCount = filter?.trim() == '' || !filter ? Math.ceil( res?.length / pgS ) : Math.ceil( takingElms?.length / pgS );
            const neededPages =[];
            for (let i = 0; i < pagesCount; i++) { neededPages.push(i+1);}
            setPages(neededPages);
            setIsLoading(false);
        };
        caller();
    }, [
        currentHousesValue.length,
        currentPageItems.length,
        currentPageNum, filter,
        pageSize,
        pages.length,
        setIsLoading]
    );
  
    return {
        currentHousesValue, setHouses,
        isLoading, setIsLoading,
        pageSize, setPageSize,
        currentPageNum, setCurrentPageNum,
        filter, setPageFilter,
        currentPageItems, setCurrentPageItems,
        pages, setPages,
    };
}

const useGetHouse = (houseId: number) => {
    const [currentHousesValue, setHouses] = useState([] as Array<any>);
    const { isLoading, setIsLoading } = useAppIsLoading();
    useEffect(() => {
        const caller = async () => {
            setIsLoading(true);
            const res = await fakeGetHousesData();
            setIsLoading(false);
            return res.find(h => h.id = houseId);
        };
        caller();
    }, [houseId, setIsLoading]);
    return { currentHousesValue, setHouses, isLoading, setIsLoading };
}
export { useGetHouse };

export default useHouses;