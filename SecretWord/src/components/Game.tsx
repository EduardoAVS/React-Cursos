import './Game.css';
import { useState , useRef } from 'react';

type GameProps = {
  verifyLetter: (letter: string) => void;
  pickedWord: string; 
  pickedCategory: string; 
  letters: string[]; 
  guessedLetters: string[]; 
  wrongLetters: string[]; 
  guesses: number; 
  score: number;
}

const Game = ({ 
  verifyLetter, 
  pickedWord, 
  pickedCategory, 
  letters, 
  guessedLetters, 
  wrongLetters, 
  guesses, 
  score 

}: GameProps) => {
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef<HTMLInputElement>(null);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    verifyLetter(letter);
    setLetter("");
  
    // Verifica se letterInputRef.current não é null antes de chamar focus()
    if (letterInputRef.current) {
      letterInputRef.current.focus();
    }
  };
  

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>

      <div className="wordContainer">
        {letters?.length > 0 && letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
            <span key={i} className="letter">{letter}</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))}
      </div>

      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="letter" 
            maxLength={1} 
            required 
            onChange={(e) => setLetter(e.target.value)} 
            value={letter} 
            ref={letterInputRef}
          />
          <button type="submit">Jogar!</button> 
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.length > 0 && wrongLetters.map((letter, i) => (
          <span key={i}>{letter} </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
