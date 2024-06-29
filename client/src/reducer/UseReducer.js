export let initialState = {
    isLoggedIn: window.localStorage.getItem("isLoggedIn") || true
};

export const reducer = (state, action) => {
    if(action.type === "USER"){
        return action.payload;
    }

    return state;
}