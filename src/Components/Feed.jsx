import { child, onValue, push, ref, update } from "firebase/database";
import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "..";
import { loadContext } from "../App";
import { Post } from "./Post";

function Feed() {
    
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState([]);
    const [isAnonym, setIsAnonym] = useState(false);




    const {database} = useContext(Context);
    const {user} = useContext(loadContext);
    const {displayName, photoURL} = user;

    const chatRef = useRef(null);

    const emptyArrayStyles = {
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    }


    const getPosts = () => {
        const postsRef = ref(database, 'posts/');
        onValue(postsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataArray = Object.values(data)
                setPosts(dataArray);
            } else {
                console.error('Ошибка при получении данных (/posts)')
            }
           
        })
    }

    const scrollToEnd = () => {
        const scrollHeight = chatRef.current.scrollHeight;
        chatRef.current.scrollTo({
            top:scrollHeight,
            behavior:'smooth',
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

    const sendMessage = async (userName, message) => {
        if (userName && message) {
            const newPostKey = push(child(ref(database), 'posts')).key;
            const postData = {
                author: isAnonym ? 'Анонимно' : userName,
                message:message,
                fullDateTime: new Date().toISOString(),
                type:'message'
            }
    
            
    
            const updates = {};
            updates['/posts/' + newPostKey] = postData;
            await update(ref(database), updates);
            return setIsAnonym(false);
            
        } else {
            console.error('Ошибка при отправке сообщения');
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
       if (posts.length)  scrollToEnd();
    } , [posts])

    return <div style={!posts.length ? emptyArrayStyles : {}}  className="feed">
        {posts.length 
        ? (<><ul ref={chatRef} className="feed_chat">
        {posts.map((item) => <Post key={item.fullDateTime}
        date={item.fullDateTime}
        type={item.type}
        name={item.author} 
        message={item.message} 
        displayName={displayName}
        photo={photoURL} />)}
    </ul>
    <div className="feed_message_field">
    <textarea 
    placeholder="Сообщение..."
    onKeyDown={handleKeyDown}
    value={message}
    onChange={handleChangeText} 
    className="feed_textArea"></textarea>
    <div className="anon">
        <p>Анон</p>
        <button onClick={() => setIsAnonym(!isAnonym)} style={{backgroundColor:`${isAnonym  ? '#6fe012' : '#ffffff8f'}`}} className="anon_button">
            <div style={{left:`${isAnonym ? '55%' : '5%'}`}} className="anon_button_element"></div>
        </button>
    </div>
    <button onClick={handleClick}></button>
    
    </div> </>)
        : <span className="preloader"></span> }
            
           
            
        
    </div>
}

export {Feed}