const searchBtn = document.getElementById('submitBtn')
const city = document.getElementById('cityName')
const cityname = document.querySelector('.cityname')
const temp = document.querySelector('#temp')
const temp_val = document.querySelector('#temp_val')
const temp_status = document.querySelector('#temp_status')
const hideClass = document.querySelector('.middle_layer')
const today_date = document.querySelector('.today_date')
const today_day = document.querySelector('.day')

const getCurrentDay = () => {
    var weekday = new Array(7)
    weekday[0] = 'Sun'
    weekday[1] = 'Mon'
    weekday[2] = 'Tue'
    weekday[3] = 'wed'
    weekday[4] = 'Thu'
    weekday[5] = 'Fri'
    weekday[6] = 'Sat'
    const currentDay = new Date()
    const day = weekday[currentDay.getDay()]
    return day
}
const getCurrentDate = ()=>{
    var Month = new Array(12)
    Month[0] = 'Jan'
    Month[1] = 'Feb'
    Month[2] = 'Mar'
    Month[3] = 'Apr'
    Month[4] = 'May'
    Month[5] = 'Jun'
    Month[6] = 'Jul'
    Month[7] = 'Aug'
    Month[8] = 'Sep'
    Month[9] = 'Oct'
    Month[10] = 'Nov'
    Month[11] = 'Dec'
    const currentDay = new Date()
    const CurrentMonth = Month[currentDay.getMonth()]
    var currentdate = currentDay.getDate()
    const fullDate = currentdate + " " +  CurrentMonth
    return fullDate
}

today_date.innerHTML = getCurrentDate()
today_day.innerHTML = getCurrentDay()

const getInfo = async (e) => {
    e.preventDefault();
    const cityVal = city.value
    if (cityVal == "") {
        cityname.innerText = `Please write the name before you search`
        hideClass.classList.add('data_hide')
        console.log(cityname)

    } else {
        try {

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=0adbdf3ffdc44576c8a48e1937fc11b3`
            const apidata = await fetch(url)
            const actualData = await apidata.json()
            console.log(actualData)
            cityname.innerText = `${actualData.name}, ${actualData.sys.country}`

            temp_val.innerText = actualData.main.temp
        
            hideClass.classList.remove('data_hide')
            if (actualData.weather[0].main == 'Clouds') {
                temp_status.innerText = '☁'
            } else if (actualData.weather[0].main == 'Clear') {
                temp_status.innerText = '⛅'
            } else if (actualData.weather[0].main == 'Rain') {
                temp_status.innerText = '🌨'
            } else {
                temp_status.innerText = '⛅'
            }

        } catch {
            cityname.innerText = `Please enter city name properly`
            hideClass.classList.add('data_hide')
        }
    }
}

searchBtn.addEventListener('click', getInfo)