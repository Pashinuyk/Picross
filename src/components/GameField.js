import './GameField.css'

const num = 2

const GameField = (props) => {
    return (
        <>
          {
            props.level[num].content.map((str, ind1) =>
              <div>
                {str.map((val, ind2) =>
                  <button key={ind1 + (ind2 < 10 ? ind2/10 : ind2/100)} className={ind1 == props.level[num].content.length-1 && ind2 == 0 ? 'borderLeft borderBottom'
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
