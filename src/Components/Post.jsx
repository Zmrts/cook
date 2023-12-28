
import { UserAvatar } from "./UserAvatar";
function Post(props) {
  const {isAnonym, type, name, photo, message, date, authUserName, } = props;

  const postStyle = {
    alignSelf: "flex-end",
  };
  const noteStyle = {
    backgroundColor: "#0a8c97",
  };

  return (
    <>
      {type === "message" && (
        <li style={name === authUserName ? postStyle : {}} className="post">
          <div className="post_info">
            <UserAvatar imageSRC={photo} />
            <p className="post_author">{name}</p>
          </div>
          <p className="post_content">{message}</p>
        </li>
      )}
      {type === "note" && (
        <li style={type === "note" ? noteStyle : {}} className="post">
          <div style={{display:'flex', gap:'1rem',}} className="post_info">
            <p style={{ fontWeight: "600" }} className="post_author">
              Уведомление
            </p>
            <p className="note_date">{date.slice(0,10)}</p>
          </div>
          <p className="post_content">{message}</p>
        </li>
      )}
    </>
  );
}
export { Post };
