import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { wordList } from './data/word';

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

type Stage = {
  id: number;
  name: string;
};

const stages: Stage[] = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3;

function App() {
  const [words] = useState<{ [key: string]: string[] }>(wordList);
  const [gameStage, setGameStage] = useState(stages[0].name);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");

  const [letters, setLetters] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);

  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback((): { word: string; category: string } => {
    const categories = Object.keys(words) as string[]; 
    const category: string = categories[Math.floor(Math.random() * categories.length)];
    const word: string = words[category][Math.floor(Math.random() * words[category].length)];
  
    return { word, category };
  }, [words]);
  

  const startGame = useCallback(() => {
    const { word, category } = pickWordAndCategory();
  
    let wordLetters = word.split("").map((l) => l.toLowerCase());

    // Limpar letras
    clearLetterStates();
  
    setPickedCategory(category); 
    setPickedWord(word); 
    setLetters(wordLetters);
  
    setGuessedLetters([]);
    setWrongLetters([]);
    setGuesses(guessesQty);
  
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
    
  };

  const verifyLetter = (letter: string) => {
    const normalizedLetter = letter.toLowerCase();

    // Verifica se a letra já foi usada
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    // push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }

  };
  const clearLetterStates = () => {
      setGuessedLetters([]);
      setWrongLetters([]);
    
  }

  useEffect(() => {
    if(guesses <= 0){

      clearLetterStates()
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => (actualScore += 100));

      // restart with a new letter
      startGame();

    }    

  }, [guessedLetters, letters, startGame])


  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' &&
        <Game 
          verifyLetter={verifyLetter}
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
