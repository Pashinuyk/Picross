const LowerMenu = (props) => {
    return (
        <>
        <hr />
          <div style={{ marginTop: '100px', marginBottom: '100px',
            display: 'flex', justifyContent: 'space-around'
           }}>
            <button onClick={() => props.changer(props.lvlNum-1)}>1</button>
            <button onClick={() => props.changer(props.lvlNum+1)}>2</button>
          </div>
        </>  
    )
}

export default LowerMenu;