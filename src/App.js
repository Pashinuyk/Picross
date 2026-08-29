import './App.css'
import GameField from './components/GameField'

const num = 0

const App = (props) => {
      return (
        <div className='App'>
          <GameField level={props.level}/>
        </div>
      );
    }

export default App;
