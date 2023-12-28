import { AuthContext } from "../hoc/AuthProvider";
import { useContext } from "react";

const UserAvatar = (props) => {
    const {user} = useContext(AuthContext);
    const {imageSRC} = props;
    const defaultImageSRC = 'https://firebasestorage.googleapis.com/v0/b/auth-test-4310e.appspot.com/o/user_avatars%2Fdefault_Avatar.jpg?alt=media&token=51279384-a24b-4bac-a991-bd6afb1c7be1';


    return <div className="user_avatar">
        {imageSRC ? <img src={imageSRC} alt={user.displayName} /> : <img src={defaultImageSRC} alt={user.displayName}/>}
    </div>
}

export {UserAvatar}