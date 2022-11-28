"use strict";
document.addEventListener("DOMContentLoaded",domloaded);
function domloaded(){
    const price_filter = document.getElementById("priceFilter");
    price_filter.setAttribute("max","50");
    async function FetchItems(){
        const url = "https://gist.githubusercontent.com/GunnarThorunnarson/4c7e296af3437290e00209551d79a760/raw/4d90d3dd652bd4e3ea046cfb0ffc2bb1745c5771/data.json";
        try{
            const response = await fetch(url);
            return response.json();
        }catch(err){console.log(err);}
    }
   console.log(items); 
}