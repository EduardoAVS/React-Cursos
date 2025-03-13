import './GameOver.css'

type GameOverProps = {
  retry: () => void;
  score: number;
}

const GameOver = ({ retry, score }: GameOverProps) => {
  return (
    <div>
      <h1>Fim de jogo</h1>
      <h2>A sua pontuação foi: <span>{score} </span></h2>
      <button onClick={retry}>Começar o jogo</button>
    </div>
  )
}

export default GameOver