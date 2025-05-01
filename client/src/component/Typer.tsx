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
  gameStarted
}: TyperProps) {

    const [userClassName, setUserClassName] = useState<string>("user-input has-background-white has-text-black");
    const [wordsArr, setWordsArr] = useState<string[]>([]);
    const [wordsArrIndex, setWordsArrIndex] = useState<number>(0);
    const [correctWordArr, setCorrectWordArr] = useState<string[]>([]);
    const [userInput, setUserInput] = useState<string>("");
    const [accuracy, setAccuracy] = useState<number>(100);
    const [characterErrorCount, setCharacterErrorCount] = useState<number>(0);
    const [now, setNow] = useState<number>(Date.now());
    const [timeTaken, setTimeTaken] = useState<number>(0);
    const [timeRemaining, setTimeRemaining] = useState(3 * 60);
    const inputReference = useRef<HTMLInputElement>(null);

    const countdownSeconds = Math.max(0, Math.floor((startTime - now) / 1000));
    const inputDisabled = countdownSeconds > 0 || gameFinish || timeRemaining === 0 || !gameStarted;

    const reloadGame = () => window.location.reload();

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
        setUserClassName("has-background-white has-text-black");
    }

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
      if (countdownSeconds > 0) return;

        let value = event.target.value;
        setUserInput(value);

        if (value.includes(" ")) {
          const userWord = userInput.trim();
          if (userWord === wordsArr[wordsArrIndex]) {
            setCorrectWordArr(prev => [...prev, userWord]);
            setWordsArrIndex(prev => prev + 1);
            setUserInput("");
          }
        }

        handleCharacterError(value);

        if (wordsArrIndex === wordsArr.length - 1 && value === wordsArr[wordsArrIndex]) {
          setCorrectWordArr(prev => [...prev, value]);
          setUserInput("");
          handleGameFinish();
        }
      };

      useEffect(() => {
        if (gameStarted) {
          const timerInterval = setInterval(() => {
            setTimeRemaining(prev => {
              if (gameFinish || prev === 0) {
                clearInterval(timerInterval);
                return prev;
              }
              return prev - 1;
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
          setWordsArr(randomParagraph.split(" "));
        }
      }, [randomParagraph]);

    //calculate wpm
    useEffect(() => {
      if (gameStarted) {
        const wordCount = correctWordArr.length;
        const timeInMinutes = (Date.now() - startTime) / 60000;
        const currentWpm = Math.round(wordCount / timeInMinutes);
        setTimeTaken(timeInMinutes);
        handleWpm(currentWpm);
      }
    }, [timeRemaining, gameStarted]);

    //calculate accuracy
    useEffect(() => {
      if (correctWordArr.length > 0) {
        const totalWords = wordsArr.length;
        const wrongWords = characterErrorCount / 5;
        const calculatedAccuracy = Math.round(((totalWords - wrongWords) / totalWords) * 100);
        setAccuracy(calculatedAccuracy);
      }
    }, [timeRemaining]);


    //progress
    useEffect(() => {
      if (correctWordArr.length > 0) {
        const progress = Math.round((correctWordArr.length / wordsArr.length) * 100);
        handleProgress(progress);
      }
    }, [correctWordArr]);

    const renderCountdown = () => (
      <h2 className="has-text-weight-semibold is-size-4 has-text-success">
        Game starts in: {Math.max(0, Math.floor((startTime - now) / 1000))}s
      </h2>
    );

    const renderStarted = () => (
      <h2 className="has-text-weight-semibold is-size-4 has-text-info">
        Game started!
      </h2>
    );

    const renderGameResult = () => (
      <div className="has-text-centered">
        <h1 className={`has-text-weight-semibold is-size-4 ${gameFinish ? "has-text-success" : "has-text-danger"}`}>
          {gameFinish ? "You Finished the race yayy..." : "Oopsie... Timeout"}
        </h1>
        <button
          className="button has-background-link has-text-light is-medium m-5"
          onClick={reloadGame}
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
          {(gameFinish || timeRemaining === 0) && renderGameResult()}
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

        <div className="has-background-white is-large">
          <input
            className={`${userClassName} input has-text-black`}
            autoComplete="off"
            disabled={inputDisabled}
            type="text"
            name="userText"
            value={userInput}
            onChange={handleInput}
            onPaste={(e) => e.preventDefault()}
            ref={inputReference}
            placeholder={countdownSeconds > 0 ? `Get ready... ${countdownSeconds}s` : "Start typing..."}
          />
        </div>

        <div className="columns is-mobile mt-4 message is-size-4">
          <div className="column is-two-quarters has-text-centered">
            <h4 className="message-header has-background-link has-text-white p-3" style={{ justifyContent: "center" }}>WPM</h4>
            <h4 className="message-body has-background-white has-text-black p-3">{wpm}</h4>
          </div>
          <div className="column is-two-quarters has-text-centered">
            <h4 className="message-header has-background-link has-text-white p-3" style={{ justifyContent: "center" }}>Accuracy</h4>
            <h4 className="message-body has-background-white has-text-black p-3">{accuracy}%</h4>
          </div>
          <div className="column has-text-centered">
            <h4 className="message-header has-background-link has-text-white p-3" style={{ justifyContent: "center" }}>Time</h4>
            <h4 className="message-body has-background-white has-text-black p-3">
              {new Date(timeTaken * 60 * 1000).toISOString().substring(14, 19)}
            </h4>
          </div>
        </div>
      </div>
    );
  }

export default Typer
