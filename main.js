
const dataFromMarsArr = [
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
const cardBodyElems = document.querySelector('.card-place')
function postData(data) {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            try{
            dataFromMarsArr.push(data)
            resolve()
            }catch(error){
                cardBodyElems.innerHTML='<h3>Ошибка отправки данных :(</h3>'
                console.log(error)
            }
        }, 1500)
        
        })
    
}

(async function getData() {
    await postData(
        {
        date: '3 июля 2020 г.',
        temperature: '-70,7 ° F',
        windspeed: '11,5 миль/ч',
        pressure: '766,9  ПА',
        }
    )
    
    
    setTimeout(() => {
        try{
            cardBodyElems.innerHTML='';
            dataFromMarsArr.forEach((dataFromMars) => {
                
                cardBodyElems.innerHTML+=
                `
                <div class="col">
                    <div class="card h-100">
                        <div class="card-body">
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
                        </div>
                    </div>
                </div>            
                `
                const clButton = document.querySelectorAll('.clbtn')
        
                clButton.forEach(function(elem,i){
                    elem.addEventListener('click', function(event){
                        event.preventDefault()
                        const {date, ...otherData} = dataFromMarsArr[i]
                        console.log(date, otherData)
                    })
                })
                
                
                
            })
        } catch(error){
            cardBodyElems.innerHTML='<h3>Ошибка получения данных :(</h3>'
            console.log(error)
            
        } 
        }, 1000)
            
    
    
})();
    



postData(
    {
    date: '4 июля 2020 г.',
    temperature: '-70,7 ° F',
    windspeed: '11,5 миль/ч',
    pressure: '766,9  ПА',
    }
)