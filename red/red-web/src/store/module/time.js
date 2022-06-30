import dayjs from "dayjs";


export const time = {
    namespaced:true,
    state:{
        realTime:"",
        fullDate:""
    },
    getters:{
        getFullDate(state){
            return state.fullDate
        },
        getRealTime(state){
            return state.realTime
        },
    },
    mutations:{
        SET_FULLDATE(state){
            const getDate = dayjs()
            state.fullDate = getDate
        },
        SET_REALTIME(state){
            const getTime = dayjs().format('hh:mm:ss')
            state.realTime = getTime
        }
    },
}