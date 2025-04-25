function Navbar() {

    return (
        <div>
            <nav className="navbar has-background-link-65 columns is-3 " role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item has-text-light is-size-3 has-text-weight-bold custom-hover m-4" data-testid = "nav-flyTyper" href="/">
                        Fly Typer
                    </a>
                    <a role="button" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample">
                    <div className="navbar-start">
                        <a className="navbar-item has-text-light is-size-5 custom-hover ml-6" data-testid = "nav-home" href="/">
                            Home
                        </a>
                        <a className="navbar-item has-text-light is-size-5 custom-hover ml-6">
                            About
                        </a>
                    </div>
                    <div className="navbar-end ">
                        <a className="navbar-item has-text-light is-size-5 custom-hover  mr-6 " data-testid = "nav-login" href="/">
                            Login
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
