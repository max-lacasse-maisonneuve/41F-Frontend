import { useState } from "react";
import "./Toast.css";
function Toast(props) {
    const [estFermee, fermer] = useState(false);
    const { message } = props;
    function fermerBoite() {
        fermer(true);
    }
    return (
        <>
            {!estFermee && (
                <div className="toast" onClick={fermerBoite}>
                    {message}
                </div>
            )}
        </>
    );
}

export default Toast;
