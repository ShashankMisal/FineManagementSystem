  
export const initialState = {
    user:null,
    isAuthenticated:false
};

const reducer = (state, action) => {
    switch(action.type){
        case "SET_USER":
            return {
                user: action.value,
                isAuthenticated:true
            }
        
        case "Logout":
            return {
                user: action.value,
                isAuthenticated:false
            }

        default:
            return state
    }
};


export default reducer