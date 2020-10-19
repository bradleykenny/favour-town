import axios from "axios";
import { useHistory } from "react-router-dom";

export const Logout = (e: any) => {
    const history = useHistory();
    axios.post(process.env.REACT_APP_API_HOST + "/logout",{},{withCredentials:true}).then(
        (response) => {
            console.log(response)
            if(response.data==="OK"){
                window.location.reload(false);
                window.alert("Logout Succesful. Please Login Again.")
                history.push("/");
            }
        },
        (error) => {
            console.log(error);
        }
    )
};