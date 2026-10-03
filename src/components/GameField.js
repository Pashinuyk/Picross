import './GameField.css'
import { Stack } from 'immutable'
import { useState, useEffect } from 'react'

const num = 5

function ChangeSolMatrix(table, value, row, col) {
  table[row][col] = value

  return table
}

// Размещение чисел-подсказок сбоку
function HorizontalTipsPlace(str) {
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

// Размещение чисел-подсказок сверху
function VerticalTipsPlace(table) {
  let stack = [...new Stack]
  let tableStack = [...new Stack]
  let counter = 0
  
  for (let i=0; i<table[0].length; i++) {
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

    if (stack.length == 0) stack.push(0)
    tableStack.push(stack)
    stack = []
  }

  return(tableStack)
}

//Выделение строк с числами-подсказками когда курсор
//над кнопками
function AimingField(el) {
  el.target.parentElement.children[1+Number(el.target.id.split(' ')[1])].classList.toggle('backlight')
  document.getElementById('H ' + String(Math.floor(Number(el.target.id.split(' ')[0])))).classList.toggle('backlight')

}

function LengthCountH(str, ind) {
  let count = 1

  for (let i=ind+1; i<str.length; i++) {
    if (str[i] == 1) count++
    else break
  }

  return count
}

function LengthCountV(matrix, indH, indV) {
  let count = 1

  for (let i=indV+1; i<matrix.length; i++) {
    if (matrix[i][indH] == 1) count++
    else break
  }

  return count
}

//Выделение поля когда курсор на
//боковых числах-подсказках
function AimingTipsH(str, el) {
  let isStr = false

  for (let i=0; i<str.length; i++) {
    let elem = document.getElementById(`${el.currentTarget.id.split(' ')[1]} ${i}`)
    if (elem.classList.contains('choosenOne')) { 
      elem.classList.toggle('backlightChoosen')
      if (isStr == false) elem.innerHTML == '' ? elem.innerHTML = LengthCountH(str, i) 
      : elem.innerHTML = ''
      isStr = true
    }
    else if (elem.classList.contains('wrongOne')) elem.classList.toggle('backlightWrong')  
    else {
      elem.classList.toggle('backlight')
      isStr = false
    }  
  }   
}

//Выделение поля когда курсор на
//верхних числах-подсказках
function AimingTipsV(el, field, ind) {
  let isStr = false;

  for (let i=0; i<field.length; i++) {
    let elem = document.getElementById(`${i} ${el.currentTarget.id.split(' ')[1]}`)
    if (elem.classList.contains('choosenOne')) {
      elem.classList.toggle('backlightChoosen')
      if (isStr == false) elem.innerHTML == '' ? elem.innerHTML = LengthCountV(field, ind, i)
      : elem.innerHTML = ''
      isStr = true
    }
    else if (elem.classList.contains('wrongOne')) elem.classList.toggle('backlightWrong')
    else {
      document.getElementById(`${i} ${el.currentTarget.id.split(' ')[1]}`).classList.toggle('backlight')
      isStr = false
    }
  }   
}

// Перекраска чисел-подсказок при нажатии по ним
function NumbersRecolor(el) {
  if (!el.target.classList.contains('redrawnNumber')) el.target.className = 'redrawnNumber'
  else el.target.classList.remove('redrawnNumber')
}

// Действие при клике ЛКМ или ПКМ по клетке
const ButtonAction = (OGtable, table, change, el, value) => {
  el.preventDefault();
  
  const row = el.target.id.split(' ')[0]
  const col = el.target.id.split(' ')[1]

  if (table[row][col] == 1 || table[row][col] == 3) return
  
  const newTable = table.map(row => [...row])

  if (OGtable[row][col] != 1 && value == 1) {
    change(ChangeSolMatrix(newTable, 3, row, col))
  } 
  else if (newTable[row][col] == 2 && value == 2) change(ChangeSolMatrix(newTable, 0, row, col))
  else change(ChangeSolMatrix(newTable, value, row, col))

}

const GameField = (props) => {

    const [OGtable, changeOGtable] = useState(props.level)

    const [solMatrix, changeSolution] = useState(
      Array.from({ length: props.level.length }, () => Array(props.level[0].length).fill(0))
    );
    const [Dragging, setDragging] = useState(false)

    useEffect(() => {
      changeSolution(
        Array.from({ length: props.level.length }, () => Array(props.level[0].length).fill(0))
      )
      changeOGtable(props.level)

      document.querySelectorAll('.redrawnNumber').forEach(val => {
        val.classList.remove('redrawnNumber')
      })
    }, [props.level])

    return (
          <div style={{display: 'grid',  
              gridTemplateRows: `160px repeat(${OGtable.length}, 1fr)`,  
              gridTemplateColumns: `25% repeat(${OGtable[0].length}, 1fr)`,
              width: 'max-content',
              margin: 'auto'
            }}>  

             {/* Верхние подсказки */}
          <div></div>

          {VerticalTipsPlace(OGtable).map((str, ind) =>
            <div id={'V ' + ind}
              onMouseOver={(e) => AimingTipsV(e, solMatrix, ind)}
              onMouseOut={(e) => AimingTipsV(e, solMatrix, ind)}              
              style={{display: 'flex', overflowY: 'auto',
              flexDirection: 'column-reverse'
            }}>
              {str.reverse().map((val) =>
                <div style={{fontSize: '20px', 
                  fontWeight: 'bold'}}
                  onClick={(e) => NumbersRecolor(e)}>{val}</div>
              )}
            </div>  
          )}



          {solMatrix.map((str, ind1) =>
          <>
                {/* Боковые подсказки */}
                <div id={'H' + ' ' + ind1} 
                onMouseOver={(e) => AimingTipsH(solMatrix[ind1], e)}
                onMouseOut={(e) => AimingTipsH(solMatrix[ind1], e)}
                style={{display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row-reverse',
                  fontSize: '20px',
                  fontWeight: 'bold', 
                  overflowX: 'auto',
                }}>{HorizontalTipsPlace(OGtable[ind1]).reverse().map((val) => 
                  <div style={{margin: '0px 10px'}} 
                    onClick={(e) => NumbersRecolor(e)}>
                      {val}
                  </div>)}
                </div>

               {/* Игровое поле */}
               { str.map((val, ind2) =>    
                  <button id={ind1 + ' ' + ind2} 
                    onClick={(e) => ButtonAction(OGtable, solMatrix, changeSolution, e, 1)}
                    onContextMenu={(e) => ButtonAction(OGtable, solMatrix, changeSolution, e, 2)}
                    onMouseOver={(e) => AimingField(e)}
                    onMouseOut={(e) => AimingField(e)}
                    className={(ind1 == solMatrix.length-1 && ind2 == 0 ? 'borderLeft borderBottom'
                      : ind1 == 0 && ind2 % 5 == 0 ? 'borderTop borderLeft'
                      : ind1 == solMatrix.length-1 && ind2 % 5 == 0 ? 'borderBottom borderLeft'
                      : ind1 % 5 == 0 && ind2 == 0 ? 'borderLeft borderTop'
                      : ind1 % 5 == 0 && ind2 == solMatrix[ind1].length-1 ? 'borderRight borderTop'
                      : ind1 == 0 && ind2 == solMatrix[ind1].length-1 ? 'borderRight borderTop' 
                      : ind1 == 0 && ind2 == 0 ? 'borderTop borderLeft' 
                      : ind1 == 0 ? 'borderTop'
                      : ind2 == 0 ? 'borderLeft'
                      : ind1 == solMatrix.length-1 && ind2 == solMatrix[ind1].length-1 ? 'borderRight borderBottom' 
                      : ind1 == solMatrix.length-1 ? 'borderBottom' 
                      : ind2 == solMatrix[ind1].length-1 ? 'borderRight' 
                      
                      : ind1 % 5 == 0 && ind2 % 5 == 0 ? 'borderTop borderLeft'
                      : ind1 % 5 == 0 ? 'borderTop'
                      : ind2 % 5 == 0 ? 'borderLeft'
                      : '') + (val == 1 ? ' choosenOne' : val == 3 ? ' wrongOne' : '')}>{val == 2 ? 'X' : ''}</button>
                )}</>               
          )}</div>
    )
}

export default GameField;