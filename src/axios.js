import axios from "axios";

const instant= axios.create({
    // baseURL:"http://localhost:3030"
    baseURL:"https://sasocketserver.herokuapp.com/"
})

export default instant