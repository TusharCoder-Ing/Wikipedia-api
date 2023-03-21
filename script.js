let rawInput = document.querySelector('input')
let userInput = ''
const button = document.getElementById("search")
const apiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const queryTitle = document.getElementById('query-title')
const imgTitle = document.getElementById('img-title')
const img = document.querySelector('img')
const summaryTitle = document.getElementById('summary-title')
const summary = document.getElementById('summary')
const toStyle = document.getElementById('main')


function titleCase(){
    let sentence = rawInput.value.toLowerCase().split(" ")
    for(let i = 0; i<sentence.length;i++){
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    userInput = sentence.join(" ")
  }

button.addEventListener('click',function(){
  titleCase()
})

//Fetch api and update values 

function fetchApi(){
  fetch(`${apiUrl}${userInput}`)
   .then(response => response.json())
   .then((response) => {
    toStyle.style.boxShadow="0 0 20px 20px var(--main-accent2)"
    toStyle.style.padding='50px 20px'

    //Validate
    if(response.title == 'Not found.'){
      queryTitle.innerHTML = "Not Found Try Searching For Something Else"
      imgTitle.innerHTML = ``
      summaryTitle.innerHTML = ``
      summary.innerHTML = '' 
      img.src = '' 
    }

    else if(response.thumbnail['source'] == ''){
      imgTitle.innerHTML = `No photos found for ${userInput}`
      queryTitle.innerHTML = "Not Found Try Searching For Something Else"
      imgTitle.innerHTML = ``
      summaryTitle.innerHTML = ``
      summary.innerHTML = '' 
      img.src = '' 
      
   }

    else{
      queryTitle.innerHTML = response.title
      imgTitle.innerHTML = `A photo of ${userInput}:`
      img.src = response.thumbnail['source']
      summaryTitle.innerHTML = `About ${userInput}:`
      summary.innerHTML = response.extract
    }
    
   })
}





button.addEventListener('click',function(){
  fetchApi()
})