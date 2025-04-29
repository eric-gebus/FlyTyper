import { useEffect, useState } from 'react';
import Typer from './Typer.tsx'

interface Data {
  id: number;
  text: string;
}

function SoloPlay() {

    const [paragraphList, setParagraphList] = useState<Data[]>([]);
    const [randomParagraph, setRandomParagraph] = useState('');
    const [gameFinish, setGameFinish] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [progress, setProgress] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [startTime, setStartTime] = useState<number>(0);


    const handleGameFinish = () => {
        setGameFinish(true);
    }

    const handleWpm = (currWpm: number) => {
        setWpm(currWpm);
    }

    const handleProgress = (progress: number) => {
        console.log("new progress:", progress);
        setProgress(progress);
    }

    useEffect(() => {
        fetch('/message.json').then((response) => {
<<<<<<< HEAD
            response.json()
            .then((data) => {
=======
            response.json().then((data: Data[]) => {
>>>>>>> Refactoring
                setParagraphList(data);
                const randomIndex = Math.floor(Math.random() * data.length);
                setRandomParagraph(data[randomIndex].text);
            })
            .catch(error => console.error('Error fetching data:', error));
        })
    }, [])

    useEffect(() => { //AI
        if (!gameStarted) {
            const countDown = 5;
            const startTime = Date.now() + countDown * 1000;
            setStartTime(startTime);
        }
    }, []);

    useEffect(() => {
        const now = Date.now();
        const delay = startTime - now;
        console.log("delay solo play: ", delay);

        if (delay > 0) {
            setTimeout(() => {
                setGameStarted(true);
            }, delay)
        }
    }, [startTime])

    if (!paragraphList || paragraphList.length === 0) {
        return <div>Loading messages...</div>;
    }

    return (
        <section className="hero ">
            <div className="hero-body">
                <div className="container">
                    <div className="columns">
                        < div className="column is-8 is-offset-2 mt-4">
                            <h1 className="is-size-2 has-text-weight-semibold has-text-black is-family-secondary">Solo Play</h1>
                            <div className="columns is-mobile is-vcentered mt-4">
                                <h4 className="column is-one-quarter has-text-black">Progress:</h4>
                                <div className="column is-6 ">
                                    <progress className=" progress is-success is-normal has-background-white" value={progress} max={100}/>
                                </div>
                            </div>
                            <Typer randomParagraph={randomParagraph} gameFinish={gameFinish}
                                handleGameFinish={handleGameFinish} wpm={wpm} handleWpm={handleWpm}
                                handleProgress={handleProgress} startTime={startTime} gameStarted={gameStarted}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SoloPlay
