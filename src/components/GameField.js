import './GameField.css'
import { Stack } from 'immutable'
import { useState } from 'react'

const num = 2

const Mess = (el, key) => {
 // el.target.innerHTML = '●'
  el.target.className='ChoosenOne'
  console.log(el.target.id)
}

const Otmetka = (el) => {
  el.preventDefault();
  if (el.target.innerHTML == 'X') el.target.innerHTML = ''
  else el.target.innerHTML = 'X'
}

function HorizontTips(str) {
  let stack = [...new Stack]
  str.reduce((product, item, index) => {
    
    if (item != 0) {
      if (index == str.length-1) stack.push(product+item)
      return product + 1  
    }  
    else {
      if (product != 0) stack.push(product)
      return 0
    }
  }, 0)

  if (stack.length == 0) stack.push(0)
  return(stack)
}

function VerticalTips(table) {
  let stack = [...new Stack]
  let tableStack = [...new Stack]
  let counter = 0
  
  for (let i=0; i<table.length; i++) {
    for (let j=0; j<table.length; j++) {
      if (table[j][i] != 0) {
        if (j == table.length-1) {
          stack.push(counter+1)
          counter = 0
        }
        else counter = counter + 1
      }
      else {
        if (counter != 0) stack.push(counter)
        counter = 0
      }
    }

    console.log('Stack: ', stack)
    if (stack.length == 0) stack.push(0)
    tableStack.push(stack)
    stack = []
  }

  console.log('StackTABLE: ',tableStack)
  return(tableStack)
}

const GameField = (props) => {

    const [Dragging, setDragging] = useState(false)

    return (
            <div style={{display: 'grid', 
              gridTemplateRows: `160px repeat(${props.level[num].content.length}, 1fr)`,  
              gridTemplateColumns: `25% repeat(${props.level[num].content[0].length}, 1fr)`,
              width: 'max-content'
             }}>  
             
           <div></div>
          {VerticalTips(props.level[num].content).map((str) =>
            <div style={{display: 'flex', overflowY: 'auto',
              flexDirection: 'column-reverse'
            }}>
              {str.reverse().map((val) =>
                <div style={{fontSize: '20px', 
                  fontWeight: 'bold'}}>{val}</div>
              )}
            </div>  
          )}



          {props.level[num].content.map((str, ind1) =>
          <>
                <div style={{display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row-reverse',
                  fontSize: '20px',
                  fontWeight: 'bold', 
                  overflowX: 'auto',
                  }}>{HorizontTips(str).reverse().map((val) => <div style={{margin: '0px 10px'}}>{val}</div>)}
                </div>

               { str.map((val, ind2) =>       
                  <button id={ind1 + (ind2 < 10 ? ind2/10 : ind2/100)} 
                    onClick={(e) => Mess(e)}
                    onContextMenu={(e) => Otmetka(e)}
                    className={ind1 == props.level[num].content.length-1 && ind2 == 0 ? 'borderLeft borderBottom'
                    : ind1 == 0 && ind2 % 5 == 0 ? 'borderTop borderLeft'
                    : ind1 == props.level[num].content.length-1 && ind2 % 5 == 0 ? 'borderBottom borderLeft'
                    : ind1 % 5 == 0 && ind2 == 0 ? 'borderLeft borderTop'
                    : ind1 % 5 == 0 && ind2 == props.level[num].content[ind1].length-1 ? 'borderRight borderTop'
                    : ind1 == 0 && ind2 == props.level[num].content[ind1].length-1 ? 'borderRight borderTop' 
                    : ind1 == 0 && ind2 == 0 ? 'borderTop borderLeft' 
                    : ind1 == 0 ? 'borderTop'
                    : ind2 == 0 ? 'borderLeft'
                    : ind1 == props.level[num].content.length-1 && ind2 == props.level[num].content[ind1].length-1 ? 'borderRight borderBottom' 
                    : ind1 == props.level[num].content.length-1 ? 'borderBottom' 
                    : ind2 == props.level[num].content[ind1].length-1 ? 'borderRight' 
                    
                    : ind1 % 5 == 0 && ind2 % 5 == 0 ? 'borderTop borderLeft'
                    : ind1 % 5 == 0 ? 'borderTop'
                    : ind2 % 5 == 0 ? 'borderLeft'
                    : ''}></button>
                )}</>               
          )}</div>
    )
}

export default GameField;