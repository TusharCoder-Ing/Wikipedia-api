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
const moreInfoWrapper = document.getElementById("more-wrapper")
const moreInfo = document.getElementById("more")


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

    else if(response.thumbnail == undefined){
      imgTitle.innerHTML = `No photos found for ${userInput}`
      queryTitle.innerHTML = `${userInput}`
      summaryTitle.innerHTML = `About ${userInput}`
      summary.innerHTML = response.extract
      imgTitle.innerHTML = ``
      img.src = '' 
      moreInfoWrapper.href = response.content_urls.desktop['page']
      moreInfo.innerHTML = `More Info About ${userInput}`
      
   }

    else{
      queryTitle.innerHTML = response.title
      imgTitle.innerHTML = `A photo of ${userInput}:`
      img.src = response.thumbnail['source']
      summaryTitle.innerHTML = `About ${userInput}:`
      summary.innerHTML = response.extract
      moreInfoWrapper.href = response.content_urls.desktop['page']
      moreInfo.innerHTML = `More Info About ${userInput}`
    }
    
   })
}





button.addEventListener('click',function(){
  fetchApi()
})