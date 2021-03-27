
const dataFromMars = [
    {
    date: '1 июля 2020 г.',
    temperature: '-70,7 ° F',
    windspeed: '11,5 миль/ч',
    pressure: '766,9  ПА',
    },
    {
    date: '2 июля 2020 г.',
    temperature: '-69,6 ° F',
    windspeed: '10 миль/ч',
    pressure: '765  ПА',
    },
]

async function postData(data) {
    try{
        
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            try{
            
            dataFromMars.push(data)
            resolve('super')
            }catch(error){
                alert('Ошибка отправки данных')
            }
        }, 1500)
        
        })
    }catch(error) {
        console.log('=ERROR=', error)
    } 
}

(async function getData() {
    await(postData())
    dataFromMars.splice(-1,1)
    const cardBodyElems = document.querySelectorAll('.card-body')
    setTimeout(() => {
        try{
            dataFromMars.forEach((dataFromMars,i) => {
                cardBodyElems[i].innerHTML=
                `
                <h5 class="card-title">Данные о погоде с Марса</h5>
                <p class="card-text">
                    Дата: ${dataFromMars.date}
                    <br>
                    Температура: ${dataFromMars.temperature}
                    <br>
                    Скорость ветра: ${dataFromMars.windspeed} 
                    <br>
                    Давление: ${dataFromMars.pressure}
                </p>
                <a href="" class="clbtn btn btn-primary">Тык!</a>
                `
                const clButton = document.querySelectorAll('.clbtn')
                clButton[i].addEventListener('click', function(event){
                    event.preventDefault()
                    const {date, ...otherData} = dataFromMars
                    console.log(date, otherData)
                })
                
            })
        } catch(error) {
            console.log('=Ошибка получения данных=', error)
        } 
        }, 1000)
            
    
    
})();
    



postData(
    {
    date: '3 июля 2020 г.',
    temperature: '-70,7 ° F',
    windspeed: '11,5 миль/ч',
    pressure: '766,9  ПА',
    }
)

