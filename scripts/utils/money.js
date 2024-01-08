 export function formatCurrency (priceCents){
   return (Math.round(priceCents)/100).toFixed(2);// math.round is used for round the cents value.
}