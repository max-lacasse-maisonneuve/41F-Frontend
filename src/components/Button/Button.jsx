import React from "react";

function Button(props) {
    const { callback, texte } = props;
    return <div onClick={callback}>{texte}</div>;
}

export default Button;
