import axios from "axios";


export default axios.create({
    baseURL :  'http://10.10.16.10:1150/swagger/index.html'       ,
    headers : {
        Authorization:
        'Bearer            ',
    },
});