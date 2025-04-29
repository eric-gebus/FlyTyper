import { useNavigate } from 'react-router-dom';
import typer from '../assets/typer.svg';


function Home() {
    const navigate = useNavigate();

    const soloPlayHandler = () => {
        console.log("soloplay clicked");
        navigate('/soloplay');
    }
    const QuickPlayHandler = () => {
        console.log("Quickplay clicked");
        navigate('/quickplay');
    }

    return (
        <section className="hero is-white height dashboard-container content-area  has-background-white-ter ">
            <div className="hero-body ">
                <div className="container">
                    <div className="columns columns mt-4 ">
                        <div className="column mt-4
          is-10-mobile
          is-10-tablet
          is-5-desktop
          is-5-widescreen
          is-5-fullhd " data-aos="fade-down">
                            <h1 className="title titled is-size-1 mb-4 has-text-weight-bold mt-6">Welcome to Fly Typer</h1>
                            <h3 className="subtitle">Increase your typing speed while racing against others!</h3>
                            <div className="buttons ">
                                <button className="button is-yellow has-background-link is-large has-text-light ml-4 mt-5 " onClick={soloPlayHandler}>Solo Play</button>
                                <button className="button has-background-link is-large has-text-light ml-4 mt-5" data-testid="qp-value" onClick={QuickPlayHandler}>Quick play</button>
                            </div>
                        </div>
                        <div data-aos="fade-right" className="column
          is-10-mobile
          is-10-tablet
          is-4-desktop
          is-7-widescreen
          is-4-fullhd is-offset-1-fullhd">
                            <figure className="image is-square">
                                <img src={typer} alt="Nice pic" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
