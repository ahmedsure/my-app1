declare interface HouseItem {
    id: number, 
    address: string, 
    country: string, 
    price: number,
    photoUrl?:string,
    bidders?:HouseBidder[]
};

declare interface HouseBidder{
 ofHouse:number;
 bidderName:string;
 biddingValue:number;
}
