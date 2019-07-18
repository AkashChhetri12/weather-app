window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let temperatureSection = document.querySelector('.degree-section')
    let temperatureSpan = document.querySelector(".degree-section span")
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>
            {
                // console.log(position)
                long = position.coords.longitude;
                lat = position.coords.latitude;


                const proxy = 'https://cors-anywhere.herokuapp.com/';
                const api = `${proxy}https://api.darksky.net/forecast/504f38cd3be0e7e5782ed5ec944ed982/${lat},${long}`;
                fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data =>{
                    const {temperature, summary, icon}= data.currently;
                    // Set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    // console.log(data);
                    locationTimezone.textContent = data.timezone;
                    setIcons(icon,document.querySelector(".icon"));
                 

                    // change temperature to celsius/farenheit
                        // FORMULA FOR CELCIUS
                        let celsius = (temperature - 32) * (5/9);
                    temperatureSection.addEventListener("click", ()=>
                    {
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                            // console.log(Math.floor(celsius))

                        }
                        else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;

                        }

                    });
                
                
                });
            }
        );

            

    }
    else{
        h1.textContent = "Please enable your location or your browser doesn't support this application"
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color : "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }

});