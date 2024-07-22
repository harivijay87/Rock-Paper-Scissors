import React, { useEffect, useState } from 'react'
import './app.css'

const App = () => {
  const [computerMove, setComputerMove] = useState()
  const [playerMove, setPlayerMove] = useState()
  const [result, setResult] = useState()
  const [update, setUpdate] = useState(0)
  const [score, setScore] = useState(JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  })
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState();
  const [gif, setGif] = useState();

  const autoPlay = () => {
    if(!isAutoPlaying){
      let newIntervalId = setInterval(() => {
        const playerMove = selectMove();
        selectMove(playerMove);
      }, 1000)
      setIntervalId(newIntervalId)
      setIsAutoPlaying(true)
    } else{
      clearInterval(intervalId);
      setIsAutoPlaying(false)
  }  
  }

  useEffect(() => {
    if(result === 'You Win'){
      setScore(score => ({
        ...score,
        wins: score.wins++
      }))
      setGif(`gif/wins/${Math.floor(Math.random() * 20) + 1}.gif`)
    }else if(result === 'You Lose'){
      setScore(score => ({
        ...score,
        losses: score.losses++
      }))
      setGif(`gif/losses/${Math.floor(Math.random() * 20) + 1}.gif`)
    }else if(result === 'Tie'){
      setScore(score => ({
        ...score,
        ties: score.ties++
      }))
      setGif(`gif/ties/${Math.floor(Math.random() * 20) + 1}.gif`)
    }
  }, [update])

  useEffect(() => {
    saveToStorage(score)
  }, [score])

  const resetScore = () => {
    localStorage.removeItem('score')
    setScore( score => ({
      wins: 0,
      losses: 0,
      ties: 0
    }))
  }

  const selectMove = (option) => {
    let randomNum = Math.random()
    let comMove = ''

    if (0 <= randomNum && randomNum < 1/3){
      setComputerMove('rock')
      comMove = 'rock'
    } else if ( 1/3 <= randomNum && randomNum < 2/3){
      setComputerMove('paper')
      comMove ='paper'
    } else if (2/3 <= randomNum && randomNum <= 1){
      setComputerMove('scissors')
      comMove = 'scissors'
    }
    setPlayerMove(option)
    compareMoves(option, comMove)
    return comMove
  }

  const compareMoves = (option, comMove) => {
    if (option === 'rock' && comMove === 'rock'){
      setResult('Tie')
    }else if (option === 'rock' && comMove === 'paper'){
      setResult('You Lose')
    }else if (option === 'rock' && comMove === 'scissors'){
      setResult('You Win')
    }

    if (option === 'paper' && comMove === 'rock'){
      setResult('You Win')
    }else if (option === 'paper' && comMove === 'paper'){
      setResult('Tie')
    }else if (option === 'paper' && comMove === 'scissors'){
      setResult('You Lose')
    }

    if (option === 'scissors' && comMove === 'rock'){
      setResult('You Lose')
    }else if (option === 'scissors' && comMove === 'paper'){
      setResult('You Win')
    }else if (option === 'scissors' && comMove === 'scissors'){
      setResult('Tie')
    }
    setUpdate(Math.random())
  }

  const saveToStorage = (score) => {
    localStorage.setItem('score', JSON.stringify(score))
  }

  return (
    <>
      

      <header>
        ROCK PAPER SCISSORS
      </header> 

      <main>
        <button onClick={() => selectMove('rock')}>
          <img src="images/rock-emoji.png" />
        </button>
        <button onClick={() => selectMove('paper')}>
          <img src="images/paper-emoji.png" />
        </button>
        <button onClick={() => selectMove('scissors')}>
          <img src="images/scissors-emoji.png" />
        </button>
      </main>

      

      {playerMove && computerMove && result &&
        <>
          <div className='result-container'>
            <div className='moves'>
                <div className='your-pick'>
                  <img src={`images/${playerMove}-emoji.png`}/>
                </div>
                <div className='computer-pick'>
                  <img src={`images/${computerMove}-emoji.png`}/>
                </div>
            </div>
            <div className='result'>
              {result === 'You Win' ? 'You Won... Congratulations!' : null}
              {result === 'You Lose' ? 'You Lost... Better Luck Next Time!' : null}
              {result === 'Tie' ? `It's a Tie... Play Again!` : null}
            </div>
          </div>
          <div className='gif'>
            <img src={gif} alt="" />
          </div>
        </>
      }

      <footer>
        <div className='score-board'>
          Wins: {score.wins}, Losses: {score.losses}, Ties: {score.ties}
        </div>
        <div className='controls'>
          <button onClick={resetScore}>Reset Score</button>
          <button onClick={autoPlay}>{!isAutoPlaying ? 'Auto Play' : 'Stop Play'}</button>
        </div>
      </footer>
    </>
  )
}

export default App
