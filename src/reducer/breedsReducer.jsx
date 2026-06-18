export const INITIAL_STATE = {
    breeds: [],
    filteredBreeds: [],
    loading: false,
    error: null,
    selectedPage: "explore",
    favorites: [],
    selectedBreed: null,
    previousPage: null,
    sort: "name_asc",
};

export const APP_ACTION_TYPES = {
    SEARCH_START: "SEARCH_START",
    SEARCH_ERROR: "SEARCH_ERROR",
    SEARCH_SUCCESS: "SEARCH_SUCCESS",
    TOGGLE_FAVORITE: "TOGGLE_FAVORITE",
    CHANGE_PAGE: "CHANGE_PAGE",
    OPEN_DETAILS: "OPEN_DETAILS",
    CLOSE_DETAILS: "CLOSE_DETAILS",
    FILTER: "FILTER",
    RESET_FILTER: "RESET_FILTER",
    CHANGE_SORT: "CHANGE_SORT",
};

export function init(initialState) {
    try {
        const savedFavorites = localStorage.getItem("favorites");

        if (!savedFavorites) return initialState;

        const parsedFavorites = JSON.parse(savedFavorites);
        return Array.isArray(parsedFavorites)
            ? { ...initialState, favorites: parsedFavorites }
            : initialState;
    } catch {
        return initialState;
    }
}

export function reducer(state, action) {
    switch (action.type) {
        case APP_ACTION_TYPES.SEARCH_START: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case APP_ACTION_TYPES.SEARCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
        case APP_ACTION_TYPES.SEARCH_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: null,
                breeds: action.payload,
                filteredBreeds: action.payload,
            };
        }
        case APP_ACTION_TYPES.TOGGLE_FAVORITE: {
            const favorite = action.payload;
            const favoriteExists = state.favorites.find(
                (breed) => breed.id === favorite.id,
            );
            let newFavorites;

            if (!favoriteExists) {
                newFavorites = [...state.favorites, favorite];
            } else {
                newFavorites = state.favorites.filter(
                    (breed) => breed.id !== favorite.id,
                );
            }
            newFavorites.sort((a, b) => a.name.localeCompare(b.name));
            localStorage.setItem("favorites", JSON.stringify(newFavorites));

            return {
                ...state,
                favorites: newFavorites,
            };
        }
        case APP_ACTION_TYPES.CHANGE_PAGE: {
            return {
                ...state,
                selectedPage: action.page,
            };
        }
        case APP_ACTION_TYPES.OPEN_DETAILS: {
            return {
                ...state,
                previousPage: state.selectedPage,
                selectedPage: "details",
                selectedBreed: action.payload,
            };
        }
        case APP_ACTION_TYPES.CLOSE_DETAILS: {
            return {
                ...state,
                selectedPage: state.previousPage,
            };
        }
        case APP_ACTION_TYPES.FILTER: {
            return {
                ...state,
                filteredBreeds: filterBreeds(state, action),
            };
        }
        case APP_ACTION_TYPES.RESET_FILTER: {
            return {
                ...state,
                filteredBreeds: state.breeds,
            };
        }
        case APP_ACTION_TYPES.CHANGE_SORT: {
            const sortOption = action.option;
            const sortedBreeds = sortBreeds(state.filteredBreeds, sortOption);

            return { ...state, sort: sortOption, filteredBreeds: sortedBreeds };
        }
        default: {
            return state;
        }
    }
}

function filterBreeds(state, action) {
    const filters = action.payload;
    let filtered = state.breeds;

    //text search
    const search = filters.search.trim().toLowerCase();
    if (filters.search.trim() !== "") {
        filtered = filtered.filter((breed) =>
            breed.name.toLowerCase().includes(search),
        );
    }

    //temperaments
    if (filters.temperaments.length > 0) {
        filtered = filtered.filter((breed) => {
            const breedTemperaments = breed.temperament
                .split(",")
                .map((temperament) => {
                    return temperament.toLowerCase().trim();
                });

            return filters.temperaments.some((temperament) =>
                breedTemperaments.includes(temperament),
            );
        });
    }

    //childFriendly
    if (filters.childFriendly !== "any") {
        const minValue = getMinValue(filters.childFriendly);
        filtered = filtered.filter((breed) => breed.childFriendly >= minValue);
    }

    //dogFriendly
    if (filters.dogFriendly !== "any") {
        const minValue = getMinValue(filters.dogFriendly);
        filtered = filtered.filter((breed) => breed.dogFriendly >= minValue);
    }

    //hypoallergenic
    if (filters.hypoallergenic) {
        filtered = filtered.filter((breed) => breed.hypoallergenic);
    }

    //origin
    if (filters.origin) {
        filtered = filtered.filter(
            (breed) =>
                breed.origin.toLowerCase() === filters.origin.toLowerCase(),
        );
    }

    //weight
    const maxWeight = filters.weight[1] < 10 ? filters.weight[1] : 99;
    filtered = filtered.filter((breed) => {
        let breedWeight = breed.weight.split("-");
        breedWeight = breedWeight.map((weigth) => Number(weigth.trim()));
        return (
            breedWeight[0] <= maxWeight && breedWeight[1] >= filters.weight[0]
        );
    });

    return filtered;
}

function getMinValue(option) {
    switch (option) {
        case "low":
            return 1;

        case "medium":
            return 3;

        case "high":
            return 4;

        default:
            return 1;
    }
}

function sortBreeds(filteredBreeds, option) {
    switch (option) {
        case "name_asc": {
            return filteredBreeds.sort((a, b) => a.name.localeCompare(b.name));
        }
        case "name_desc": {
            return filteredBreeds.sort((a, b) => b.name.localeCompare(a.name));
        }
        case "weight_asc": {
            return filteredBreeds.sort((a, b) => {
                const minWeightA = Number(a.weight.split("-")[0].trim());
                const maxWeightA = Number(a.weight.split("-")[1].trim());
                const minWeightB = Number(b.weight.split("-")[0].trim());
                const maxWeightB = Number(b.weight.split("-")[1].trim());

                return minWeightA - minWeightB || maxWeightA - maxWeightB;
            });
        }
        case "weight_desc": {
            return filteredBreeds.sort((a, b) => {
                const minWeightA = Number(a.weight.split("-")[0].trim());
                const maxWeightA = Number(a.weight.split("-")[1].trim());
                const minWeightB = Number(b.weight.split("-")[0].trim());
                const maxWeightB = Number(b.weight.split("-")[1].trim());

                return maxWeightB - maxWeightA || minWeightB - minWeightA;
            });
        }
        case "life_span_asc": {
            return filteredBreeds.sort((a, b) => {
                const minLifeSpanA = Number(a.lifeSpan.split("-")[0].trim());
                const maxLifeSpanA = Number(a.lifeSpan.split("-")[1].trim());
                const minLifeSpanB = Number(b.lifeSpan.split("-")[0].trim());
                const maxLifeSpanB = Number(b.lifeSpan.split("-")[1].trim());

                return (
                    minLifeSpanA - minLifeSpanB || maxLifeSpanA - maxLifeSpanB
                );
            });
        }
        case "life_span_desc": {
            return filteredBreeds.sort((a, b) => {
                const minLifeSpanA = Number(a.lifeSpan.split("-")[0].trim());
                const maxLifeSpanA = Number(a.lifeSpan.split("-")[1].trim());
                const minLifeSpanB = Number(b.lifeSpan.split("-")[0].trim());
                const maxLifeSpanB = Number(b.lifeSpan.split("-")[1].trim());

                return (
                    maxLifeSpanB - maxLifeSpanA || minLifeSpanB - minLifeSpanA
                );
            });
        }
        default: {
            return filteredBreeds.sort((a, b) => a.name.localeCompare(b.name));
        }
    }
}
