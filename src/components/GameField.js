import './GameField.css'

const num = 0

const GameField = (props) => {
    return (
        <>
          {
            props.level[num].content.map((str) =>
              <div>
                {str.map((val) =>
                  <button>{val}</button>
                )}
              </div>
          )}
        </>
    )
}

export default GameField;
