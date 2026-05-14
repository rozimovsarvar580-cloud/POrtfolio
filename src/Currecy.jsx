import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend)
import { Line } from 'react-chartjs-2'
function Currency() {
  const [From, setFrom] = useState('none')
  const [To, setTo] = useState('none')
  const [Amount, setAmount] = useState(0)
  const [Chartdata, setChartdata] = useState(null)
  const [country, setCountry] = useState()
  let history = []
  const today = new Date();
const start = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
function GetDates(startDate, endDate) {
  let current = new Date(startDate);
  while (current <= endDate) {
    const yyyy = current.getFullYear();
    const mm = String(current.getMonth()+1).padStart(2, '0');
    const dd = String(current.getDate()).padStart(2, '0');
    history.push(`${yyyy}-${mm}-${dd}`);
    current.setDate(current.getDate() + 1);
  }
}
GetDates(start, end);
  async function Currency(){
    try {
      const responce = await fetch(`/currency/v1/convert?api_key=Xp9Km6euYyV62ZT3oz3wzrcQ9bRQDUIa&from=${From}&to=${To}&amount=${Amount}`)
      const data = await responce.json()
      document.querySelector('#toNumber').value = data.value
    } catch (error) {
      console.log(error)
    }
  }
  async function Chart(date) {
    try {
      const responce = await fetch(`/currency/v1/historical?api_key=Xp9Km6euYyV62ZT3oz3wzrcQ9bRQDUIa&date=${date}&base=${From}&symbols=${To}`)
      const data = await responce.json()
      return data
    } catch (error) {
       console.log(error)
    }
  }
    async function  LoadChart() {
      const results = await Promise.all(history.map(date=> Chart(date)))
      const labels = results.map(r => r.date)
      const values = results.map(r => r.rates[To])
       setChartdata({
        labels,
        datasets:[{
          label: `${From} => ${To}`,
          data: values,
          borderColor: 'blue',
          backgroundColor: 'lightblue',
          pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 10,
        }]
      })
    }
  useEffect(()=>{
    if(From !== 'none' && To !== 'none' && Amount !== 0 && Amount > 0){
      Currency()
    }
    if(From !== 'none' && To !== 'none'){
      LoadChart()
    }
    if(From !== 'none'){
      country.map(item=>{
        const currency = Object.keys(item.currencies || {})
        if(currency[0] === From){
          document.querySelector('.fromsymbol').textContent =item.currencies[currency].symbol
          document.querySelector('.fromValue').textContent = item.currencies[currency].name
        }
      })
    }
    if(To !== 'none'){
      country.map(item=>{
        const currency = Object.keys(item.currencies || {})
        if(currency[0] === To){
          document.querySelector('.tosymbol').textContent =item.currencies[currency].symbol
          document.querySelector('.tovalue').textContent = item.currencies[currency].name
        }
      })
    }
  },[From,To,Amount])
  useEffect(()=>{
    let loop = 0
  async function  Countries() {
    try {
      const responce = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,currencies')
      let data = await responce.json()
      const from = document.querySelector('#from')
      const to = document.querySelector('#to')
      from.innerHTML = '<option value="none">none</option>'
      to.innerHTML= '<option value="none">none</option>'
      data = data.sort((a,b) =>a.name.common.localeCompare(b.name.common))
      setCountry(data)
      while(loop<data.length){
        const Currency = Object.keys(data[loop].currencies || {})
        from.innerHTML += `<option value="${Currency[0]}">${data[loop].name.common}</option>`
        to.innerHTML += `<option value="${Currency[0]}">${data[loop].name.common}</option>`
       loop++
      }
    } catch (error) {
      
    }
  }
  Countries()
  },[]) 
  return (
    <>
    <div className="Con">
      <div className="Confrom">
        <h1>From</h1>
        <select name="" id="from" onChange={(e)=>{setFrom(e.target.value)}}>
      </select>
      <input type="number"placeholder='0' id='fromNumber' onChange={(e)=>setAmount(Number(e.target.value))} onKeyDown={(e)=>setAmount(Number(e.target.value))}/>
      <h2 className='fromsymbol'></h2>
      <h2 className='fromValue'>Country's Currency</h2>
      </div>
       <div className="ConTo">
        <h1>To</h1>
        <select name="" id="to" onChange ={(e)=>{setTo(e.target.value)}}>
      </select>
      <input type="number"placeholder='0' id="toNumber"/>
      <h2 className='tosymbol'></h2>
      <h2 className='tovalue'>Country's Currency</h2>
       </div>
       <div className="ConChart">
        { Chartdata && <Line  data={Chartdata}/>}
        {!Chartdata && <h4>please select the countries to get there currency information chart</h4>}
       </div>
        
    </div>
    </>
  )
}

export default Currency
