import { useState } from "react";
import "../styles/filter.css";

export default function Filter({ onSearch }) {
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [sortIsOpen, setSortIsOpen] = useState(false);

    function handleChangeInput(event) {
        onSearch(event.target.value);
    }

    return (
        <section id="filter__bar">
            <div id="filter__input-wrapper">
                <input
                    id="filter__input"
                    type="text"
                    placeholder="Search cat breeds..."
                    onChange={handleChangeInput}
                />
            </div>

            <button
                className="filter__button"
                onClick={() => setFilterIsOpen(true)}
            >
                <picture>
                    <img src="/icons/filter.svg"></img>
                </picture>
                <p>Filter</p>
            </button>

            <button className="filter__button">
                <picture>
                    <img src="/icons/sort.svg"></img>
                </picture>
                <p>Sort</p>
            </button>

            {filterIsOpen && (
                <section id="filter__options">
                    <div id="filter__header">
                        <button
                            id="filter__close-button"
                            onClick={() => setFilterIsOpen(false)}
                        >
                            <picture>
                                <img
                                    src="./icons/close.svg"
                                    alt="Close button"
                                ></img>
                            </picture>
                        </button>
                        <h2>Filters</h2>
                        <button id="filter__reset-button">Reset</button>
                    </div>

                    <div id="options__temperament">
                        <h3>Temperament</h3>
                        <ul>
                            <li>Active</li>
                            <li>Affectionate</li>
                            <li>Independent</li>
                            <li>Gentle</li>
                            <li>Playful</li>
                        </ul>
                    </div>

                    <div id="options__child-friendly">
                        <h3>Child Friendly</h3>
                        <ul>
                            <li className="selected">Any</li>
                            <li>Low</li>
                            <li>Medium</li>
                            <li>High</li>
                        </ul>
                    </div>

                    <div id="options__dog-friendly">
                        <h3>Dog Friendly</h3>
                        <ul>
                            <li className="selected">Any</li>
                            <li>Low</li>
                            <li>Medium</li>
                            <li>High</li>
                        </ul>
                    </div>

                    <div>
                        <h3>Hypoallergenic</h3>
                    </div>

                    <div id="options__origin">
                        <h3>Origin</h3>
                        <select>
                            <option>All Origins</option>
                            <option>Egypt</option>
                            <option>Malasya</option>
                            <option>United States</option>
                        </select>
                    </div>

                    <div id="options__weigth">
                        <h3>Weight (Metric)</h3>
                        <div id="weight__wrapper">
                            <p>0kg</p>
                            <input
                                type="range"
                                min="0"
                                max="99"
                                step="1"
                            ></input>
                            <p>10+ kg</p>
                        </div>
                    </div>

                    <button id="filter__apply-button">Apply filters</button>
                </section>
            )}
        </section>
    );
}
