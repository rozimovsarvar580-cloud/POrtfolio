import { useEffect } from "react"

function Example(){
        let Array = []
    let filteredArray = []
    const MoreInfo = async (e)=>{
        let d = 0
        let r = 0
      try {
        const responce = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,continents,borders,flags,languages,population,region,cca3')
        const data = await responce.json()
        const CArds = document.querySelector('.CArds')
        const input =document.querySelector('input')
        const select =document.querySelector('select')
        input.style.display = 'none'
        select.style.display = 'none'
        CArds.innerHTML = ''
        Array = []
        filteredArray = []
         if(e.target.className){
            console.log(e.target.className)
           data.map(item=>{
         if(item.name.common === e.target.className){
            Array.push(item)
         }
        })
        while(d<Array.length){
            let div = document.createElement('p')
            div.className = 'Country'
            div.innerHTML = ` 
            <img src=${Array[d].flags.svg} />
            <h1 class = 'text'><li>Name: ${Array[d].name.common}</li>
            <li>Capital: ${Array[d].capital}</li>
            <li>Population: ${Array[d].population}</li>
            <li>Region: ${Array[d].region}</li></h1>
                `
            CArds.appendChild(div)
               div = document.createElement('p')
            div.className = 'Country2'
            div.innerHTML = `
            <h1>Borders</h1>`
                while(r<Array[d].borders.length){
                data.map(item=>{
                if(item.cca3 === Array[d].borders[r]){
                 let div2 = document.createElement('p')
                 div2.className = item.name.common
                 div2.onclick=(e)=> MoreInfo(e)  
            div2.innerHTML = `
            <img src=${item.flags.svg} />
            <li>Name: ${item.name.common}</li>
                `
                div.appendChild(div2)
                }
            })
                r++
            }
            CArds.appendChild(div)
            d++
        }
        }
        if(e.target.parentElement.className !== 'CArds' ){
            console.log(e.target.parentElement.className)
            data.map(item=>{
         if(item.name.common === e.target.parentElement.className){
            Array.push(item)
         }
        })
        while(d<Array.length){
            let div = document.createElement('p')
            div.className = 'Country'
            div.innerHTML = ` 
            <img src=${Array[d].flags.svg} />
            <h1 class ='text'>
            <li>Name: ${Array[d].name.common}</li>
            <li>Capital: ${Array[d].capital}</li>
            <li>Population: ${Array[d].population}</li>
            <li>Region: ${Array[d].region}</li></h1>
                `
            CArds.appendChild(div)
            div = document.createElement('p')
            div.className = 'Country2'
            div.innerHTML = `
            <h1>Borders</h1>`
                while(r<Array[d].borders.length){
                data.map(item=>{
                if(item.cca3 === Array[d].borders[r]){
                 let div2 = document.createElement('p')
                 div2.className = item.name.common
                 div2.onclick=(e)=> MoreInfo(e)     
            div2.innerHTML = `
            <img src=${item.flags.svg} />
            <li>Name: ${item.name.common}</li>
                `
                div.appendChild(div2)
                }
            })
                r++
            }
            CArds.appendChild(div)
            d++
        }
        }
      } catch (error) {
        console.log(error)
      }
    }
    const filter = async()=>{
     Array = []
    filteredArray = []
        let i  = 0
     try {
        const responce = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,continents,borders,flags,languages,population,region,cca3,maps')
        let data = await responce.json()
        data=data.sort((a,b)=>a.name.common.localeCompare(b.name.common))
        const input = document.querySelector('input')
        const select = document.querySelector('select')
        const CArds = document.querySelector('.CArds')
        console.log(data)
        CArds.innerHTML = ''
        if(select.value === 'All'){
            Array = data
            if(input.value !== ''){
                Array.map(item=>{
                if(item.name.common.includes(input.value)){
                    filteredArray.push(item)
                }
              })
              while(i<filteredArray.length){
        let div = document.createElement('div')
        div.className = filteredArray[i].name.common
        div.onclick = (e) => MoreInfo(e)
         div.innerHTML = `
         <img src="${filteredArray[i].flags.svg}"/>
         <li>Name: ${filteredArray[i].name.common}</li>
         <li>Capital: ${filteredArray[i].capital}</li>
         <li>Population: ${filteredArray[i].population}</li>
         <li>Region: ${filteredArray[i].region}</li>
         `
         CArds.appendChild(div)
        i++
       }
            }else{
                filteredArray = Array
               while(i<filteredArray.length){
        let div = document.createElement('div')
        div.className = filteredArray[i].name.common
        div.onclick = (e) => MoreInfo(e)
         div.innerHTML = `
         <img src="${filteredArray[i].flags.svg}"/>
         <li>Name: ${filteredArray[i].name.common}</li>
         <li>Capital: ${filteredArray[i].capital}</li>
         <li>Population: ${filteredArray[i].population}</li>
         <li>Region: ${filteredArray[i].region}</li>
         `
         CArds.appendChild(div)
        i++
       }
            }
        }else{
            data.map(item =>{
                if(item.region === select.value){
                    Array.push(item)
                }
            })
          if(input.value !== ''){
                Array.map(item=>{
                if(item.name.common.includes(input.value)){
                    filteredArray.push(item)
                }
              })
            while(i<filteredArray.length){
        let div = document.createElement('div')
        div.className = filteredArray[i].name.common
        div.onclick = (e) => MoreInfo(e)
         div.innerHTML = `
         <img src="${filteredArray[i].flags.svg}"/>
         <li>Name: ${filteredArray[i].name.common}</li>
         <li>Capital: ${filteredArray[i].capital}</li>
         <li>Population: ${filteredArray[i].population}</li>
         <li>Region: ${filteredArray[i].region}</li>
         `
         CArds.appendChild(div)
        i++
       }
            }else{
                filteredArray = Array
             while(i<filteredArray.length){
        let div = document.createElement('div')
        div.className = filteredArray[i].name.common
        div.onclick = (e) => MoreInfo(e)
         div.innerHTML = `
         <img src="${filteredArray[i].flags.svg}"/>
         <li>Name: ${filteredArray[i].name.common}</li>
         <li>Capital: ${filteredArray[i].capital}</li>
         <li>Population: ${filteredArray[i].population}</li>
         <li>Region: ${filteredArray[i].region}</li>
         `
         CArds.appendChild(div)
        i++
       }
            }
        }
     } catch (error) {
        console.log(error)
     }
    }
    filter()
    return(
        <>
        <input type="text" onKeyDown={filter}/>
        <select name="" id="" onChange={filter}>
            <option value="All">All</option>
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Asia">Asia</option>
            <option value="Americas">Americas</option>
        </select>
        <div className="CArds">
        </div>
        </>
    )
}
export default Example