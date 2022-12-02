"use strict";
document.addEventListener("DOMContentLoaded",domloaded);
async function domloaded(){
    /*Sets Up The Price Filtering Slider with the id of priceFilter*/
    function initSlider(min,max){
        price_filter.setAttribute("max",max);
        price_filter.setAttribute("min",min);
        price_filter.setAttribute("step",1);
        price_filter.value = min;
        price_display.innerText = items.sort(compare_price)[min].price;
        price_filter.addEventListener("input",()=>{
            price_display.innerText = items[price_filter.value].price;
            for (let i=0; i<pricers.length; i++){
                if(pricers[i].innerText < price_display.innerText && !filtered_pricers.includes(pricers[i])){
                    filtered_pricers.push(pricers[i]);
                }
            }
        });
    }
    function findMinDate(ls){
        let min_date = new Date(ls[0].date);
        let return_min_date = undefined;
        for(let i=0; i<ls.length; i++){
            const comparison_date= new Date(ls[i].date);
            if(min_date.getTime() > comparison_date.getTime()){
                min_date = new Date(ls[i].date);
                return_min_date = ls[i].date;
            }
        }
        return return_min_date;
    }
    function findMaxDate(ls){
        let max_date = new Date(ls[0].date);
        let return_max_date = undefined;
        for(let i=0; i<ls.length; i++){
            const comparison_date = new Date(ls[i].date);
            if(max_date.getTime() < comparison_date.getTime()){
                max_date = new Date(ls[i].date);
                return_max_date = ls[i].date;
            }
        }
        return return_max_date;
    }
    function filterArtist(){
        for(let i=0; i<artist.length; i++){
            if(!artist[i].innerText.toLowerCase().includes(artist_filter.value.toLowerCase())&&!filtered_artist.includes(artist[i])&&artist_filter.value != ""){
                filtered_artist.push(artist[i]);
            }
        }
    }
    function filterArt(){
        for(let i=0; i<art.length;i++){
            if(!art[i].innerText.toLowerCase().includes(art_filter.value.toLowerCase())&&!filtered_art.includes(art[i])&&art_filter.value != ""){
                filtered_art.push(art[i]);
            }
        }
    }
    function filterStartDate(){
        const start_date = new Date(start_date_filter.value);
        for(let i=0; i<production_dates.length; i++){
            const compare_date = new Date(production_dates[i].innerText);
            if(compare_date.getTime() < start_date.getTime()&&!filtered_dates.includes(production_dates[i])&&start_date!=""){
                filtered_dates.push(production_dates[i]);
            }
        }
    }
    function filterEndDate(){
        const end_date = new Date(end_date_filter.value);
        for(let i=0; i<production_dates.length; i++){
            const compare_date = new Date(production_dates[i].innerText);
            if(compare_date.getTime() > end_date.getTime()&&!filtered_dates.includes[production_dates[i]]&&end_date!=""){
                filtered_dates.push(production_dates[i]);
            }
        }
    }
    /*Sets Up All The Products from a list(ls) On The Page Along With Their Styles puts them in a provided container(con)*/ 
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
            artist.push(item_creator);
            pricers.push(pricer);
            art.push(item_name);
            production_dates.push(production_time);
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
    /*This Is For Fetching The Required Products And Returning Them In A Json Array*/
    async function FetchItems(){
        const url = "https://gist.githubusercontent.com/GunnarThorunnarson/4c7e296af3437290e00209551d79a760/raw/4d90d3dd652bd4e3ea046cfb0ffc2bb1745c5771/data.json";
        try{
            const response = await fetch(url)
            return response.json();
        }catch(err){(err);}
    }
    /*Hides Products, Using The hideItem Class From The SPA.ccs File,
     Based On All Filter Parameters using the filtered_items List*/
    function setHidden(){
        for(let i=0; i<pricers.length;i++){
            if(filtered_pricers.includes(pricers[i])||filtered_artist.includes(artist[i])||filtered_art.includes(art[i])||filtered_dates.includes(production_dates[i])){
                pricers[i].parentElement.parentElement.setAttribute("class",'hideItem');
            }else{
                pricers[i].parentElement.parentElement.setAttribute("class","w3-col l3 m6 w3-margin-bottom");
            }
        }
    }
    /*Empties The filtered_items List So That setHidden() Can Show The Item Again*/
    function emptyFilters(){
        const start_date = new Date(start_date_filter.value);
        const end_date = new Date(end_date_filter.value);
        for(let i = 0; i < filtered_pricers.length;i++){
            if(filtered_pricers[i].innerText >= price_display.innerText){
                filtered_pricers.splice(i,1);
            }
        }
        for(let i=0; i< filtered_artist.length; i++){
            if(filtered_artist[i].innerText.toLowerCase().includes(artist_filter.value.toLowerCase())){
                filtered_artist.splice(i,1);
            }
        }
        for(let i=0; i< filtered_art.length; i++){
            if(filtered_art[i].innerText.toLowerCase().includes(art_filter.value.toLowerCase())){
                filtered_art.splice(i,1);
            }
        }
        for(let i=0;i < filtered_dates.length; i++){
            const date = new Date(filtered_dates[i].innerText);
            if(start_date_filter.value != ""&&end_date_filter.value != ""){
                if(date.getTime()>=start_date.getTime() && date.getTime()<=end_date.getTime()){
                    filtered_dates.splice(i,1);
                }
            }
            else if(start_date_filter.value != ""){
                if(date.getTime()>=start_date.getTime()){
                    filtered_dates.splice(i,1);
                }
            }
            else if(end_date_filter != ""){
                if(date.getTime()<=end_date.getTime()){
                    filtered_dates.splice(i,1);
                }
            }
        }
    }
    function dynamicCalender(){
        if(start_date_filter.value!=""){
            end_date_filter.setAttribute("min",start_date_filter.value);
        }
        if(end_date_filter.value!=""){
            start_date_filter.setAttribute("max",end_date_filter.value);
        }
    }
    /*Custom Comparative Function So That Items Can Be Sorted With array.prototype.sort()*/
    function compare_price(a,b){
        if(a.price < b.price){
            return -1;
        }
        if(a.price > b.price){
            return 1;
        }
        return 0;
    }
    /*Final Prep Where All Functions Are Used In Conjunction With Each Other*/
    const items = await FetchItems();
    const price_filter = document.getElementById("priceFilter");
    const price_display = document.getElementById("priceDisplay");
    const artist_filter = document.getElementById("artistFilter");
    const art_filter = document.getElementById("artFilter");
    const start_date_filter = document.getElementById("startDateFilter");
    const end_date_filter = document.getElementById("endDateFilter");
    start_date_filter.setAttribute("min",findMinDate(items));
    start_date_filter.setAttribute("max",findMaxDate(items));
    end_date_filter.setAttribute("min",findMinDate(items));
    end_date_filter.setAttribute("max",findMaxDate(items));
    artist_filter.addEventListener("input",filterArtist);
    art_filter.addEventListener("input",filterArt);
    start_date_filter.onchange = filterStartDate;
    end_date_filter.addEventListener("input",filterEndDate);
    initSlider(0,items.length-1);
    const item_container = document.createElement("div");
    const item_list = document.createElement("div");
    item_list.setAttribute("class","w3-row-padding");
    const filtered_pricers = [];
    const filtered_artist = [];
    const filtered_art = [];
    const filtered_dates = [];
    const pricers = [];
    const artist = [];
    const art = [];
    const production_dates = [];
    fillContainer(item_list,items.sort(compare_price));
    item_container.appendChild(item_list);
    document.getElementById("pageContent").appendChild(item_container);
    window.setInterval(setHidden,100);
    window.setInterval(emptyFilters,100);
    window.setInterval(dynamicCalender,100);
}