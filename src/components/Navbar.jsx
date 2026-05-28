import "../styles/navbar.css";

export default function Navbar() {
    return (
        <nav id="navbar__container">
            <button className="navbar__button">
                <picture>
                    <img src="./icons/browse_purple.svg"></img>
                </picture>
                <p>Explore</p>
            </button>

            <button className="navbar__button">
                <picture>
                    <img src="./icons/favorite_grey.svg"></img>
                </picture>
                <p>Favorites</p>
            </button>

            <button className="navbar__button">
                <picture>
                    <img src="./icons/dots_more.svg"></img>
                </picture>
                <p>More</p>
            </button>
        </nav>
    );
}
