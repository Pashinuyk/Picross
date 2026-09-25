import './App.css'
import GameField from './components/GameField'
import LowerMenu from './components/LowerMenu';
import { useState } from 'react'

const num = 2

const App = (props) => {
      const [lvlNum, changeLvlNum] = useState(0)

      console.log('Starts rendering!')
      return (
        <div className='App'>
          <span>{lvlNum}</span>
          <GameField level={props.levels[lvlNum].content} />
          <LowerMenu lvlNum={lvlNum} changer={changeLvlNum} />
        </div>
      );
    }

export default App;
