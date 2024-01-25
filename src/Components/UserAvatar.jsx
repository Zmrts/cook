import { AuthContext } from "../hoc/AuthProvider";
import { useContext } from "react";


const UserAvatar = (props) => {
    const {user} = useContext(AuthContext);
    const {imageSRC} = props;
    const defaultImageSRC = process.env.REACT_APP_DEFAULT_USER_AVATAR;

    return <div className="user_avatar">
        {imageSRC ? <img src={imageSRC} alt={user.displayName} /> : <img src={defaultImageSRC} alt={user.displayName}/>}
    </div>
}

export {UserAvatar}