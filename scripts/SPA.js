"use strict";
document.addEventListener("DOMContentLoaded",domloaded);
async function domloaded(){
    function initSlider(min,max){
        const price_filter = document.getElementById("priceFilter");
        const price_display = document.getElementById("priceDisplay");
        price_filter.setAttribute("max",max);
        price_filter.setAttribute("min",min);
        price_filter.value = min;
        price_display.innerText = min;
        price_filter.addEventListener("input",()=>{
            price_display.innerText = price_filter.value;
        });
    }
    function getHighestPrice(ls){
        let highest_price = 0;
        for(let i = 0; i < ls.length; i++){
            if(highest_price < ls[i].price){highest_price = ls[i].price}
        }
        return highest_price;
    }
    function getLowestPrice(ls){
        let lowest_price = ls[0].price;
        for(let i = 0; i < ls.length;i++){
           if(lowest_price > ls[i].price){lowest_price = ls[i].price} 
        }
        return lowest_price;
    }
    function fillContainer(con,ls){
        for(let i = 0; i < ls.length; i++){
            const appended_item = document.createElement("li");
            const item_picture = document.createElement("img");
            const item_name = document.createElement("div");
            const item_creator = document.createElement("div");
            const production_time = document.createElement("div");
            const pricer = document.createElement("div");
            item_name.innerText = ls[i].painting;
            item_creator.innerText = ls[i].artist;
            production_time.innerText = ls[i].date;
            pricer.innerText = ls[i].price;
            item_picture.src = ls[i].img;
            item_picture.height = 500;
            item_picture.width = 500;
            appended_item.appendChild(item_picture);
            appended_item.appendChild(item_name);
            appended_item.appendChild(item_creator);
            appended_item.appendChild(production_time);
            appended_item.appendChild(pricer);
            con.appendChild(appended_item);
        }
    }
    async function FetchItems(){
        const url = "https://gist.githubusercontent.com/GunnarThorunnarson/4c7e296af3437290e00209551d79a760/raw/4d90d3dd652bd4e3ea046cfb0ffc2bb1745c5771/data.json";
        try{
            const response = await fetch(url)
            return response.json();
        }catch(err){console.log(err);}
    }
    const items = await FetchItems();
    initSlider(getLowestPrice(items),getHighestPrice(items));
    const item_container = document.createElement("div");
    const item_list = document.createElement("ul");
    item_list.style.listStyle = "none";
    fillContainer(item_list,items);
    item_container.appendChild(item_list);
    document.body.appendChild(item_container) 

}