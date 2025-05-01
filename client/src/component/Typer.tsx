import { useEffect, useState, useRef } from "react"

interface TyperProps {
  randomParagraph: string,
  gameFinish: boolean,
  handleGameFinish: () => void,
  wpm: number,
  handleWpm: (currWpm: number) => void,
  handleProgress: (progress: number) => void,
  startTime: number,
  gameStarted: boolean
}

function Typer({
  randomParagraph,
  gameFinish,
  handleGameFinish,
  wpm,
  handleWpm,
  handleProgress,
  startTime,
  gameStarted }:
  TyperProps) {

    const [userClassName, setUserClassName] = useState<string>("user-input");
    const [wordsArr, setWordsArr] = useState<string[]>([]);
    const [wordsArrIndex, setWordsArrIndex] = useState<number>(0);
    const [correctWordArr, setcorrectWordArr] = useState<string[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [accuracy, setAccuracy] = useState<number>(100);
    const [characterErrorCount, setCharacterErrorCount] = useState<number>(0);
    const [now, setNow] = useState<number>(Date.now());
    const [timeTaken, setTimeTaken] = useState<number>(0);
    const [timeRemaining, setTimeRemaining] = useState(3 * 60);

    const inputReference = useRef<HTMLInputElement>(null);


    const buttonHandler = () => window.location.reload();


    function handleCharacterError(value: string) {
        let currWord = wordsArr[wordsArrIndex];
        for (let i = 0; i < value.length; i++) {
            if (value[i] !== currWord[i]) {
                setCharacterErrorCount((characterErrorCount) => characterErrorCount + 1);
                console.log("char error...");
                setUserClassName("has-background-danger");
                return;
            }
        }
        setUserClassName("has-background-white");
    }

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value;
        setUserInput(value);

        if (value.includes(" ")) {
            let userWord = userInput.trim();
            if (userWord === wordsArr[wordsArrIndex]) {
                setcorrectWordArr([...correctWordArr, userWord]);
                setWordsArrIndex((wordsArrIndex) => wordsArrIndex + 1);
                setUserInput("");
            }
        }

        handleCharacterError(value);

        if (wordsArrIndex === wordsArr.length - 1 && value === wordsArr[wordsArrIndex]) {
                setcorrectWordArr([...correctWordArr, value]);
                setUserInput("");
                handleGameFinish();
            }
    }

    useEffect(() => {
        if (gameStarted) {
            const timerInterval = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (gameFinish) {
                        clearInterval(timerInterval);
                        return timeRemaining;
                    } else if (prevTime === 0) {
                        clearInterval(timerInterval);
                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
            return () => clearInterval(timerInterval);
        }
    }, [gameFinish, gameStarted]);

    useEffect(() => {
        if (!gameStarted) {
            const interval = setInterval(() => setNow(Date.now()), 1000);
            return () => clearInterval(interval);
        } else {
            inputReference.current?.focus();
        }
    }, [gameStarted]);


    useEffect(() => {
        if (randomParagraph) {
            let words = randomParagraph.split(" ");
            setWordsArr(words);
        }
    }, [randomParagraph]);

    //calculate wpm
    useEffect(() => {
      if (gameStarted) {
        let wordcount = correctWordArr.length;
        let timeTaken = (Date.now() - startTime) / 60000;
        let currwpm = Math.round((wordcount / timeTaken));
        setTimeTaken(timeTaken);
        handleWpm(currwpm);
      }
    }, [timeRemaining, gameStarted]);

    //calculate accuracy
    useEffect(() => {
        if (correctWordArr.length > 0) {
            const totalWordCount = wordsArr.length;
            const wrongWordsCount = characterErrorCount / 5;
            const wordAccuracy = Math.round(((totalWordCount - wrongWordsCount) / totalWordCount) * 100);
            setAccuracy(wordAccuracy);
        }
    }, [timeRemaining]);

    //progress
    useEffect(() => {
        if (correctWordArr.length > 0) {
            handleProgress(Math.round((correctWordArr.length / wordsArr.length) * 100));
        }
    }, [correctWordArr]);

    const renderCountdown = () => (
      <div className="columns column is-8 has-text-centered">
        <h2 className="has-text-weight-semibold is-size-4 has-text-success">
          Game starts in: {Math.max(0, Math.floor((startTime - now) / 1000))}s
        </h2>
      </div>
    );

    const renderStarted = () => (
      <h2 className="has-text-weight-semibold is-size-4 has-text-info">
        Game started!
      </h2>
    )

    const renderGameOver = () => (
      <div>
        <h1 className={`has-text-weight-semibold is-size-4 ${gameFinish ? "has-text-success" : "has-text-danger"}`}>
          {gameFinish ? "You Finished the race yayy..." : "Oopsie... Timeout"}
        </h1>
        <button
          className="button is-yellow has-background-link has-text-light is-medium mb-4"
          onClick={buttonHandler}
        >
          Play Again
        </button>
      </div>
    );

    const getCharClassName = (char: string, index: number) => {
      const userChar = correctWordArr.length === 0
        ? userInput[index]
        : (correctWordArr.join(' ') + " " + userInput)[index];

      if (userChar == null) return 'has-text-black';
      return userChar === char ? 'has-text-success-50' : 'has-text-danger';
    };


    return (
      <div className="hero-body">
        <div className="columns column is-8 has-text-centered">
          {!gameStarted && startTime && renderCountdown()}
          {gameStarted && !gameFinish && timeRemaining > 0 && renderStarted()}
          {(gameFinish || timeRemaining === 0) && renderGameOver()}
        </div>

      <div className="message is-size-4">
        <div className="message-header has-background-link has-text-light">
          <p>Snippet</p>
          <p>{new Date(timeRemaining * 1000).toISOString().substring(14, 19)}</p>
        </div>
        <div className="message-body has-background-white">
          <h3 className="is-size-3">
            <strong>
              {randomParagraph?.split('').map((char, index) => (
                <span key={index} className={getCharClassName(char, index)}>
                  {char}
                </span>
              ))}
            </strong>
          </h3>
        </div>
      </div>

      <div className="mt-4">
          <input className={`${userClassName} input`}
            autoComplete="off"
            disabled={gameFinish || timeRemaining === 0 || !gameStarted}
            type="text"
            name="userText"
            value={userInput}
            onChange={handleInput}
            onPaste={(e) => {
              e.preventDefault()
              return false;}}
            ref={inputReference}
          />
      </div>

      <div className="columns is-mobile mt-4 message is-size-4">
          <div className="column is-two-quarters has-text-centered">
              <h4 className="message-header has-background-link has-text-white p-3" style={{ justifyContent: "center"}}>WPM</h4>
              <h4 className="message-body has-background-white has-text-black p-3">{wpm} </h4>
          </div>
          <div className="column is-two-quarters has-text-centered">
              <h4 className="message-header has-background-link has-text-white p-3" style={{ justifyContent: "center"}}>Accuracy </h4>
              <h4 className="message-body has-background-white has-text-black p-3">{accuracy}%</h4>
          </div>
          <div className="column ">
              <h4 className=" message-header has-background-link has-text-white p-3" style={{ justifyContent: "center"}}>Time</h4>
              <h4 className="message-body has-background-white has-text-black p-3">
                {new Date(timeTaken * 60 * 1000).toISOString().substring(14, 19)}
              </h4>
          </div>
        </div>
      </div>
    )
}

export default Typer
