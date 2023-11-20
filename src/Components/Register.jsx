import { useContext } from "react";
import { Form } from "./Form";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { Context } from "..";
import { ref, set,} from "firebase/database";

function Register() {
    const {auth, database} = useContext(Context);


    const setUserData = async (userID, name, email) => {
       await set(ref(database, 'users/' + name ), {
            userID: userID,
            email: email,
            rating: 0,
        })
    }
    
   
    const  handleRegister = async (email, password, name) => {
   
       const newUser = await createUserWithEmailAndPassword(auth, email, password);
       console.log('НОВЫЙ ПОЛЬЗОВАТЕЛЬ',newUser);
        
        await updateProfile(auth.currentUser, {
            displayName:name,
        })
        const userID = newUser.user.uid;
        console.log('\u2713','USER ID',userID);
        const userEmail = newUser.user.email;
        console.log('\u2713','EMAIL', userEmail);
        const userName= newUser.user.displayName;
        console.log('\u2713','USER-NAME', userName);

      await setUserData(userID, userName, userEmail);

    }



    return <>
        <Form nameInput={true} title="ЗАРЕГИСТРИРОВАТЬСЯ" handleClick={handleRegister} />
    </>
}

export {Register}