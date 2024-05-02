const tempEl = document.getElementById("temprature-el");
const latEl = document.getElementById("lat-span");
const lonEl = document.getElementById("lon-span");
const coordinatesEl = document.getElementById("coordinates");
coordinatesEl.addEventListener("submit",(event)=>{
    event.preventDefault()
    const latitude=document.getElementById("latitude").value;  
    const longitude=document.getElementById("longitude").value;
    
    //form validation
    if(!latitude){
        alert("Latitude field cant be empty!")
        return;
    }
    if(isNaN(latitude) || latitude < -90 || latitude > 90){
        alert("Enter a valid Latitude");
        return;
    }
    if(!longitude){
        alert("Longitude field cant be empty!")
        return;
    }
    if(isNaN(longitude) || longitude < -180 || longitude > 180){
        alert("Enter a valid longitude");
        return;
    }
    const api=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    getTemp(api)
    latEl.innerHTML=latitude;
    lonEl.innerHTML=longitude;
})

//function to get the temprature
const getTemp = (api)=>{
    fetch(api)
.then(response=>{
    if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json()
})
.then(data=>{
    tempEl.innerHTML= data.current.temperature_2m;
})
.catch(error=>{
    console.error("An error occured:",error.message);
    alert("An error occurred while fetching data. Please try again.")
})
}