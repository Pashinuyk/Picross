import './GameField.css'

const num = 3

const Mess = (el, key) => {
  el.target.innerHTML = '●'
  console.log(el.target.id)
}

const Otmetka = (el) => {
  if (el.target.innerHTML == 'X') el.target.innerHTML = '?'
  else el.target.innerHTML = 'X'
}

const GameField = (props) => {
    return (
        <>
          {
            props.level[num].content.map((str, ind1) =>
              <div>
                {str.reduce((product, item) => {
                  return item>0 ? product+1 : product 
                }, 0)}

                {str.map((val, ind2) =>
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
                    : ''}> </button>
                )}
              </div>
          )}
        </>
    )
}

export default GameField;
