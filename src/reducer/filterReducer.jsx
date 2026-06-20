export const FILTER_INITIAL_STATE = {
    search: "",
    temperaments: [],
    childFriendly: "any",
    dogFriendly: "any",
    hypoallergenic: false,
    origin: null,
    weight: [0, 10],
};

export const FILTER_ACTION_TYPES = {
    UPDATE_FILTER: "UPDATE_FILTER",
    RESET_FILTER: "RESET_FILTER",
    REMOVE_FILTER: "REMOVE_FILTER",
};

export function filterReducer(state, action) {
    switch (action.type) {
        case FILTER_ACTION_TYPES.UPDATE_FILTER: {
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        }
        case FILTER_ACTION_TYPES.RESET_FILTER: {
            return FILTER_INITIAL_STATE;
        }
        case FILTER_ACTION_TYPES.REMOVE_FILTER: {
            const key = action.payload.key;

            if (key !== "temperaments") {
                return { ...state, [key]: FILTER_INITIAL_STATE[key] };
            } else {
                const deletedTemperament = action.payload.temperament;
                const newTemperaments = state.temperaments.filter(
                    (temperament) => temperament !== deletedTemperament,
                );

                return {
                    ...state,
                    temperaments: newTemperaments,
                };
            }
        }
        default: {
            return state;
        }
    }
}
