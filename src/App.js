import './App.css'
import GameField from './components/GameField'

const num = 2

const App = (props) => {
      console.log('Starts rendering!')
      return (
        <div className='App'>
          <GameField level={props.level} />
        </div>
      );
    }

export default App;
