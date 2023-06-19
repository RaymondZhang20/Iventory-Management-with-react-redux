const initialState = {
    currentPage: 'home',
};

const navbar = (state = initialState, action) => {
    switch (action.type) {
        case 'NAV_HOME':
            return {
                currentPage: 'home',
            };
        case 'NAV_ABOUT':
            return {
                currentPage: 'about',
            };
        default:
            return state;
    }
};

export default navbar;