import "./Footer.css";
function Footer() {
    const date = new Date();

    return <footer>Tous droits réservés - {date.getFullYear()}</footer>;
}

export default Footer;
