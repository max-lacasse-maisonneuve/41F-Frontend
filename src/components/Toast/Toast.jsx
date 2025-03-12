import "./Toast.css";

function Toast(props) {
    const { message } = props;
    return <div className="toast">{message}</div>;
}

export default Toast;
