
const getlocation = async () => {
    const url = `http://ip-api.com/json/24.48.0.1?lang=de`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

const getWeather= async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2316c8cfc33a9870c5136300789248e0`; 
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

function gatDayOrNight(){
    let DayOrNight;
    let d = new Date();

    if(d.getHours >= 6 && d.getHours <= 19){
        DayOrNight = 'Day';
    }else{
        DayOrNight = 'night'
    }
}

function getIcon(weMain){
    let icon;
    switch (weMain) {
        case 'Thunderstorm':
            icon = `${weMain}.svg`;
            break;
        case 'Drizzle':
            icon = `${weMain}.svg`;
            break;
        case 'Rain':
            icon = `${weMain}.svg`;
            break;
        case 'Snow':
            icon = `${weMain}.svg`;
            break;
        case 'Clear':
            const DayOrNigh = getDayOrNight();
            icon = `${weMain}-${DayOrNigh}.svg`;
            break;
        case 'Clouds':
            icon = `${weMain}.svg`;
            break;
        case 'Atmosphere':
            icon = `${weMain}.png`;
            break;
    }
    return icon;
}

function getTemp(weTemp){
    const k = weTemp;
    const f = (k - 273.15) * 9/5 + 32;
    const c = k - 273.15;
    return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)};
}

const loti = document.querySelector('.timezone');
const icon = document.querySelector('.icon');
const dese = document.querySelector('.degree-section');
const deg = document.querySelector('.degree-section h2');
const unit = document.querySelector('.degree-section span');
const tede = document.querySelector('.temperature-description');


getlocation()
    .then(locData => {
        const timezone = locData.timezone
        console.log(timezone);
        loti.textContent = timezone;
         return getWeather(locData.lat, locData.lon)
    }).then(weData => {
        const weTemp = weData.main.temp;
        const weMain = weData.weather[0].main;
        const weDes = weData.weather[0].description;
        console.log(weTemp, weMain, weDes);


        const iconName = getIcon(weMain);
        icon.innerHTML = `<img src = 'icons/${iconName}'></img>`;

        deg.textContent = Math.floor(weTemp);
        unit.textContent = 'K';

        dese.addEventListener('click', function(e){
            if(unit.textContent == 'K'){
                deg.textContent = getTemp(weTemp).far;
                unit.textContent = 'F';
            }else if(unit.textContent == 'F'){
                deg.textContent = getTemp(weTemp).can;
                unit.textContent = 'C';
            }else{
                deg.textContent = getTemp(weTemp).kel;
                unit.textContent = 'K';
            }
        })

        tede.textContent = weDes;
    })

