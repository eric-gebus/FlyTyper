import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/');
  }

    return (
        <div>
            <nav className="navbar has-background-link-65 is-1 is-flex is-justify-content-space-between" role="navigation" aria-label="main navigation">
                <div className="navbar-brand ">
                    <a className="navbar-item has-text-light is-size-3 has-text-weight-bold custom-hover m-4"
                        href="/"
                        data-testid="nav-flyTyper"
                        style={{ backgroundColor: "unset", border: "none" }}
                        onClick={handleNavigation}
                         >Fly Typer
                    </a>
                    <a role="button" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        {/*
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                         */}
                    </a>
                </div>
                <div className="navbarBasicExample is-align-content-center mr-4">
                    <div className="navbar-start is-flex is-justify-content-center">
                        <a className="navbar-item has-text-light is-size-5 custom-hover" href="/" data-testid="nav-home" onClick={handleNavigation}>
                            Home
                        </a>
                        <a className="navbar-item has-text-light is-size-5 custom-hover">
                            About
                        </a>
                        <a className="navbar-item has-text-light is-size-5 custom-hover" href="/" data-testid="nav-login" onClick={handleNavigation}>
                            Login
                        </a>
                    </div>
                    <div className="navbar-end ">
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
