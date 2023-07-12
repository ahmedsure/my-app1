const currencyFormatter =  (value:number,currency: 'USD'|'EGP'='EGP', maximumFractionDigits:number= 0) => 
Intl.NumberFormat("en-US", {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: maximumFractionDigits
}).format(value);
export default currencyFormatter;