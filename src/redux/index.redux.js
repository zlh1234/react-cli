
const ADD_NUM = 'ADD_NUM';
const RE_NUM = 'RE_NUM';
let timer = null;
const init = {
    num:0,
    arr:[]
}

export function indexRedux(stare=init,action){
    let { type,payload } = action;
    switch(type){
        case ADD_NUM:
            return { ...stare,num:stare.num+payload.a }
        case RE_NUM:
            if(stare.num){
                return { ...stare,num:stare.num-payload.a }
            }
        default:
            return stare
    }
}

export function addFn(n){
    return { type:ADD_NUM,payload:{a:n} }
}
export function reFn(n){
    return { type:RE_NUM,payload:{ a:n } }
}
export function asyncFn(n){
    return dispatch => {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            dispatch({ type:ADD_NUM,payload:{ a:n } });
        },2000);
    }
}