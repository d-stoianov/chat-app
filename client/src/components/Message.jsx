import "../styles/Message.css"

const Message = ({ username, message }) => {
    return (
        <>  
            {
                username == message.username ?
                <div className="myMessage">
                    <h1 className="myUsername">
                        {message.username}
                    </h1>
                    <p>
                        {message.text}
                    </p>
                    <p className="myTime">
                        {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                </div>
                :
                <div className="otherMessage">
                    <h1 className="otherUsername">
                        {message.username}
                    </h1>
                    <p>
                        {message.text}
                    </p>
                    <p className="otherTime">
                        {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                </div>
            }
        </>
    )
}

export default Message