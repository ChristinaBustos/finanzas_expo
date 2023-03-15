import AxiosClient from '../config/axios'

export default {
    doGet(endPoint){
        return AxiosClient.get(endPoint)
    },
    doPost(endPoint,payload){
        return AxiosClient.post(endPoint,payload)
    },
    doPut(endPoint,payload){
        return AxiosClient.put(endPoint,payload)
    },
    doDelete(endpoint){
        return AxiosClient.delete(endPoint)
    }
}