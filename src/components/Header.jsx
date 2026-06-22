import "../styles/header.css";

export default function Header({ page, isWideScreen }) {
    if (page !== "details" || isWideScreen)
        return (
            <header>
                <picture className="header__icons">
                    {page === "explore" ? (
                        <img src="./icons/paw.svg" alt="Cat paw"></img>
                    ) : (
                        page === "favorites" && (
                            <img
                                src="./icons/favorite_purple.svg"
                                alt="Heart"
                            ></img>
                        )
                    )}
                </picture>

                {page === "explore" ? (
                    <h1 id="header__title">Cat Breed Explorer</h1>
                ) : (
                    page === "favorites" && (
                        <h1 id="header__title">Favorites</h1>
                    )
                )}
            </header>
        );
}
