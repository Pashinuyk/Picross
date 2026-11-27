
const LowerMenu = (props) => {
    return (
        <>
        <hr />
          <div style={{ marginTop: '100px', marginBottom: '100px',
            display: 'flex', justifyContent: 'space-around'
           }}>
            <button disabled={props.lvlNum == 0 ? true : false} 
                    onClick={() => props.changer(props.lvlNum-1)}>
                      1
            </button>
            <button disabled={props.lvlNum == props.maxLvl-1 ? true : false}
                    onClick={() => props.changer(props.lvlNum+1)}>
              2
            </button>
          </div>
        </>  
    )
}

export default LowerMenu;