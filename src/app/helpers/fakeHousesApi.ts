
const houses: HouseItem[] = [
    { id: 1, address: "12. Switzerland 1st Left ", country: "Switzerland", price: 900000 ,photoUrl:'1 (1)',bidders:[]},
    { id: 2, address: "1158 Switzerland right 2sec.", country: "Switzerland", price: 875000 ,photoUrl:'1 (2)',bidders:[]}
];

export async function fakeGetHousesData():Promise<HouseItem[]> {
    let copy = [...houses];
    if(localStorage.getItem('houses') == null || 
       localStorage.getItem('houses') == undefined || 
       localStorage.getItem('houses') == '[]')
        localStorage.setItem('houses',JSON.stringify( copy));
    else
    {copy = JSON.parse( localStorage.getItem('houses') as string) as HouseItem[] ;}
    return  new Promise((resolve,_reject)=>{
        setTimeout(() => resolve(copy), 1500);
    });
   
  }

  export async function fakeAddHousesData(newHouse:HouseItem):Promise<HouseItem[]> {
    const copy = JSON.parse( localStorage.getItem('houses') as string) as HouseItem[] ;
    newHouse.id = copy.length+1;
    copy.push({...newHouse});
    localStorage.setItem('houses',JSON.stringify( copy));
    return  new Promise((resolve,_reject)=>{
        setTimeout(() => resolve(Object.values(copy)), 250);
    });
   
  }

  export async function fakeAddHouseBidder(houseBidder:HouseBidder):Promise<HouseItem[]> {
    const copy = JSON.parse( localStorage.getItem('houses') as string) as HouseItem[] ;
    const find = copy.findIndex(h => h.id == houseBidder.ofHouse);
    if (find != -1) {
        const obj = copy[find];
        if(!obj.bidders)
        obj.bidders = [];
        obj.bidders?.push({ ...houseBidder });
        copy[find] = { ...obj };
    }
    localStorage.setItem('houses',JSON.stringify( copy));
    return  new Promise((resolve)=>{
        setTimeout(() => resolve(Object.values(copy)), 250);
    });
   
  }

  export async function fakeRemoveHouseBidder(houseBidder:HouseBidder):Promise<HouseItem[]> {
    const copy = JSON.parse( localStorage.getItem('houses') as string) as HouseItem[] ;
    const find = copy.findIndex(h => h.id == houseBidder.ofHouse);
    if (find != -1) {
        const obj = copy[find];
        const newBedders =  obj.bidders?.filter(b=>b.bidderName != houseBidder.bidderName);
         obj.bidders = [...newBedders??[]];
        copy[find] = { ...obj };
    }
    localStorage.setItem('houses',JSON.stringify( copy));
    return  new Promise((resolve)=>{
        setTimeout(() => resolve(Object.values(copy)), 250);
    });
   
  }

  export async function fakeAddAutoHousesData():Promise<HouseItem[]> {
    const copy = [...houses].push({
        id:houses?.length+1,
        address:` new House Address ${(houses?.length+1)*100}`,
        country: "Switzerland", price: Math.ceil( 900000 * Math.random() )
    });
    localStorage.setItem('houses',JSON.stringify( copy));

    return  new Promise((resolve,_reject)=>{
        setTimeout(() => resolve(Object.values(copy)), 250);
    });
   
  }