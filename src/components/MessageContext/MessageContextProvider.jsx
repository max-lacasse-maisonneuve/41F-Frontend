import "./Message.css";
import { useContext, createContext, useState } from "react";
export const MessageContext = createContext();

function MessageContextProvider(props) {
    const { children } = props;
    let [message, setMessage] = useState(null);
    let [type, setType] = useState("INFO");

    function afficherMessage(message, type) {
        console.log(message);

        setMessage(message);
        setType(type);

        setTimeout(cacherMessage, 3000);
    }

    function cacherMessage() {
        setMessage(null), setType("INFO");
    }

    return (
        <MessageContext.Provider value={{ afficherMessage, cacherMessage }}>
            {children}
            {message && (
                <div className="message" data-type={type} onClick={cacherMessage}>
                    {message}
                </div>
            )}
        </MessageContext.Provider>
    );
}

export default MessageContextProvider;
