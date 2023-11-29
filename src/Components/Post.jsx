
function Post(props) {

    const {name, photo, message, displayName} = props;

    const postStyle = {
        alignSelf: 'flex-end',
    }

    return (
        <li style={(name === displayName) ? postStyle : {}} className="post">
            
            <div className="post_info">
                {photo ? <img src={photo}/> : <div className="post_avatar"></div>}
                <p className="post_author">{name}</p>
            </div>
            <p className="post_content">{message}</p>
        </li>
    )
}


export {Post}