import { api, requestConfig } from '../utils/config'

// Get user details
const profile = async(token: string) => {
    const config = requestConfig("GET", null, token)
    console.log("🔍 Configuração da requisição:", config);

    try{
        const res = await fetch(api + "/users/profile", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    }
    catch(error){
        console.log(error);
    }
}

const userService = {
    profile,

}

export default userService;

