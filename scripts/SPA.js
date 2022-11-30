"use strict";
document.addEventListener("DOMContentLoaded",domloaded);
async function domloaded(){
    function initSlider(min,max){
        const price_filter = document.getElementById("priceFilter");
        const price_display = document.getElementById("priceDisplay");
        price_filter.setAttribute("max",max);
        price_filter.setAttribute("min",min);
        price_filter.setAttribute("step",1);
        price_filter.value = min;
        price_display.innerText = items.sort(compare_price)[min].price;
        price_filter.addEventListener("input",()=>{
            price_display.innerText = items[price_filter.value].price;
            const filtered_prices = pricers.filter(item=>{
                return item.innerText < price_display.innerText;
            });
            for(let i=0; i<pricers.length;i++){
                if(filtered_prices.includes(pricers[i])){
                    pricers[i].parentElement.parentElement.setAttribute("class",'hideItem');
                }else{
                    pricers[i].parentElement.parentElement.setAttribute("class","w3-col l3 m6 w3-margin-bottom");
                }
            }
        });
    }
    function fillContainer(con,ls){
        for(let i = 0; i < ls.length; i++){
            const appended_item = document.createElement("div");
            const display_container = document.createElement("div");
            const item_picture = document.createElement("img");
            const item_name = document.createElement("div");
            const item_creator = document.createElement("div");
            const production_time = document.createElement("div");
            const pricer = document.createElement("div");
            display_container.setAttribute("class","w3-display-container");
            appended_item.setAttribute("class","w3-col l3 m6 w3-margin-bottom");
            item_name.setAttribute("class","w3-display-topleft w3-black w3-padding");
            item_creator.setAttribute("class","w3-black w3-padding");
            production_time.setAttribute("class","w3-black w3-padding");
            pricer.setAttribute("class","w3-black w3-padding");
            item_picture.setAttribute("width","100%");
            item_picture.setAttribute("height","425");
            pricers.push(pricer);
            item_name.innerText = ls[i].painting;
            item_creator.innerText = ls[i].artist;
            production_time.innerText = ls[i].date;
            pricer.innerText = ls[i].price;
            item_picture.src = ls[i].img;
            display_container.appendChild(item_picture);
            display_container.appendChild(item_name);
            display_container.appendChild(item_creator);
            display_container.appendChild(production_time);
            display_container.appendChild(pricer);
            appended_item.appendChild(display_container);
            con.appendChild(appended_item);
        }
    }
    async function FetchItems(){
        const url = "https://gist.githubusercontent.com/GunnarThorunnarson/4c7e296af3437290e00209551d79a760/raw/4d90d3dd652bd4e3ea046cfb0ffc2bb1745c5771/data.json";
        try{
            const response = await fetch(url)
            return response.json();
        }catch(err){(err);}
    }
    function compare_price(a,b){
        if(a.price < b.price){
            return -1;
        }
        if(a.price > b.price){
            return 1;
        }
        return 0;
    }
    const items = await FetchItems();
    initSlider(0,items.length-1);
    const item_container = document.createElement("div");
    const item_list = document.createElement("div");
    item_list.setAttribute("class","w3-row-padding");
    const pricers = [];
    fillContainer(item_list,items.sort(compare_price));
    item_container.appendChild(item_list);
    document.getElementById("pageContent").appendChild(item_container);
}