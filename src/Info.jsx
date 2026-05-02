import { useEffect } from "react"
import  data  from "./data.json"
function Info(){
  useEffect(() => {
    let isDragging = false
    let currentCard = null
    let numberZ
    let numberTop
    const cards = document.querySelectorAll('.infoCard')
    const handleMouseMove = (e) => {
      if (isDragging && currentCard) {
        currentCard.style.marginTop = `${e.clientY-220}px`
        currentCard.style.marginLeft = `${e.clientX}px`
      }
    }

    const handleMouseUp = () => {
      if(currentCard){
        if(currentCard.classList.contains('one')){
        currentCard.style.marginTop = `140px`
        currentCard.style.marginLeft = `560px`
        currentCard.style.zIndex = '0'
        numberTop = 50
        numberZ = 7
        cards.forEach(card =>{
          if(card !== currentCard){
            card.style.marginTop = `${numberTop}px`
            card.style.zIndex = `${numberZ}`
            numberTop+=15
          }
          numberZ-=1
          
        })
      }else{
        currentCard.style.marginTop = `140px`
        currentCard.style.marginLeft = `560px`
        currentCard.style.zIndex = '0'
        cards.forEach((card) =>{
          if(card !== currentCard){
            card.style.marginTop = `${Number(card.style.marginTop.replace('px',''))-15}px`
            card.style.zIndex = `${Number(card.style.zIndex)+1}`
          }
        })
      }
      }
      isDragging = false
      currentCard = null
    }

     const handleMouseDown = (card) =>{
      isDragging = true
      currentCard = card
     }
     cards.forEach(card => {
      const fn = ()=> handleMouseDown(card)
      card.addEventListener('mousedown', fn)
      card.addEventListener('touchstart',fn)
      card._mouseDownHandler = fn
     });
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleMouseMove)
    document.addEventListener('touchend', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleMouseMove)
      document.removeEventListener('touchend', handleMouseUp)
      cards.forEach(card=>{
        card.removeEventListener('mousedown',card._mouseDownHandler)
        card.removeEventListener('touchstart',card._mouseDownHandler)
      })
    }
  }, [])
    return(
        <>
        <div className="about">
            <h1>The Sensitive Visionary Who Refuses to Give Up</h1>
        </div>
        <div className="Cards">
          {data.informantions.map(item=>{
            return(
              <div key={item.id} className={'infoCard '+ item.id}>
                <h1>{item.title}</h1>
                <h2>{item.story}</h2>
              </div>
            )
          })}
        </div>
        
        </>
    )
}
export default Info