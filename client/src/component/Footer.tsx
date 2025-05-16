function Footer() {
  
    return (
        <footer className="hero-footer">
            <div className="content has-background-light has-text-centered has-text-black p-3">
                <hr className="my-3 has-background-grey-light ml-6 mr-6 " />
                <strong data-testid="flytyper-footer" style={{ color: "black" }}>Fly Typer</strong>
                <p>© {new Date().getFullYear()} All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
