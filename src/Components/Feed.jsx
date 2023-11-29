import { child, onValue, push, ref, update } from "firebase/database";
import { useContext, useEffect, useState } from "react"
import { Context } from "..";
import { loadContext } from "../App";
import { Post } from "./Post";

function Feed() {
    
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState([]);




    const {database} = useContext(Context);
    const {user} = useContext(loadContext);
    const {displayName, photoURL} = user;

    const emptyArrayStyles = {
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }


    const getPosts = () => {
        const postsRef = ref(database, 'posts/');
        onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            const dataArray = Object.values(data)
            setPosts(dataArray);
        })
    }

    const handleChangeText = (evt) => {
        setMessage(evt.target.value);
   
    }
    const  handleClick = async () => {
        await sendMessage(user.displayName, message);
        setMessage('');     
    }
    const handleKeyDown = (evt) => {
        if (evt.key === 'Enter' && evt.shiftKey) {
            evt.preventDefault();
            setMessage((prevMsg) => prevMsg + '\n')
        } else if (evt.key === 'Enter') {
            handleClick();
        }
    }

    const sendMessage = (userName, message) => {
        const postData = {
            author:userName,
            message:message,
        }

        const newPostKey = push(child(ref(database), 'posts')).key;

        const updates = {};
        updates['/posts/' + newPostKey] = postData;

        return update(ref(database), updates);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return <div className="feed">
        <div className="feed_content">
            <ul style={!posts.length ? emptyArrayStyles : {}}  className="feed_chat">
                {posts.length 
                ? posts.map((item) => <Post
                message={item.message} 
                name={item.author} 
                displayName={displayName}
                />)
                : <span className="preloader"></span> }
            </ul>
            <div className="feed_message_field">
            <textarea 
            onKeyDown={handleKeyDown}
            value={message}
            onChange={handleChangeText} 
            className="feed_textArea" rows='3'></textarea>
            <button onClick={handleClick}>Отправить</button>
            </div>
            
        </div>
    </div>
}

export {Feed}