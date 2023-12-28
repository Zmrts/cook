import { child, onValue, push, ref, update } from "firebase/database";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "..";
import { Post } from "./Post";
import { AuthContext } from "../hoc/AuthProvider";

function Feed() {
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState(null);
  const [isAnonym, setIsAnonym] = useState(false);
  const { database } = useContext(Context);

  const { user } = useContext(AuthContext);
  const { photoURL, displayName } = user;

  const chatRef = useRef(null);

  const emptyArrayStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const getPosts = () => {
    const postsRef = ref(database, "posts/");
    onValue(postsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const dataArray = Object.values(data);
        const userLinks = {};
        dataArray.forEach((post) => {
          if (post.type === "message" && post.isAnonym === false) {
            if (userLinks[post.userID]) {
              post.photoURL = userLinks[post.userID].photoURL;
              post.author = userLinks[post.userID].author;
            } else {
              userLinks[post.userID] = {};
              const userRef = ref(database, `users/${post.userID}`);

              onValue(userRef, (snapshot) => {
                const userData = snapshot.val();
                userLinks[post.userID].photoURL = userData.photoURL;
                userLinks[post.userID].author = userData.userName; 

                post.photoURL = userData.photoURL;
                post.author = userData.userName;

              });
              setPosts(dataArray);
            }
          }
        });
      } else {
        setPosts([]);
        console.error("Ошибка при получении данных (/posts)");
      }
    });
  };

  const scrollToEnd = () => {
    const scrollHeight = chatRef.current.scrollHeight;
    chatRef.current.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });
  };
  const handleChangeText = (evt) => {
    setMessage(evt.target.value);
  };
  const handleClick = async () => {
    await sendMessage(user.uid, message);
    setMessage("");
  };
  const handleKeyDown = (evt) => {
    if (evt.key === "Enter" && evt.shiftKey) {
      evt.preventDefault();
      setMessage((prevMsg) => prevMsg + "\n");
    } else if (evt.key === "Enter") {
      handleClick();
    }
  };

  const sendMessage = async (userID, message) => {
    if (userID && message) {
      const newPostKey = push(child(ref(database), "posts")).key;
      const postData = {
        isAnonym: isAnonym ? true : false,
        userID: isAnonym ? null : userID,
        message: message,
        fullDateTime: new Date().toISOString(),
        type: "message",
      };

      const updates = {};
      updates["/posts/" + newPostKey] = postData;
      await update(ref(database), updates);
      return setIsAnonym(false);
    } else {
      console.error("Ошибка при отправке сообщения");
    }
  };
  useEffect(() => getPosts(), []);

  useEffect(() => {
    if (posts && posts.length) scrollToEnd();
  }, [posts]);

  return (
    <div style={posts === null ? emptyArrayStyles : {}} className="feed">
      {posts !== null ? (
        <>
          <ul ref={chatRef} className="feed_chat">
            {posts.map(({ author, fullDateTime, message, type, isAnonym, photoURL }) => (
              <Post
                key={fullDateTime}
                isAnonym={isAnonym}
                name={author}
                type={type}
                message={message}
                date={fullDateTime}
                photo={photoURL}
                authUserName={displayName}
              />
            ))}
          </ul>
          <div className="feed_message_field">
            <textarea
              placeholder="Сообщение..."
              onKeyDown={handleKeyDown}
              value={message}
              onChange={handleChangeText}
              className="feed_textArea"
            ></textarea>
            <div className="anon">
              <p>Анон</p>
              <button
                onClick={() => setIsAnonym(!isAnonym)}
                style={{
                  backgroundColor: `${isAnonym ? "#6fe012" : "#ffffff8f"}`,
                }}
                className="anon_button"
              >
                <div
                  style={{ left: `${isAnonym ? "55%" : "5%"}` }}
                  className="anon_button_element"
                ></div>
              </button>
            </div>
            <button onClick={handleClick}></button>
          </div>{" "}
        </>
      ) : (
        <span className="preloader"></span>
      )}
    </div>
  );
}

export { Feed };
