import "./HeroAccueil.css";
import { useState } from "react";
import { motion, AnimatePresence, transform, easeInOut, delay } from "motion/react";
import CassetteVideo from "../CassetteVideo/CassetteVideo";
import { Link } from "react-router-dom";
function HeroAccueil() {
    let [visite, setVisite] = useState(true);

    function onClic() {
        setVisite(!visite);
    }

    const variantes = {
        cache: { opacity: 0, transform: "scaleX(0)" },
        visible: {
            opacity: 1,
            transform: "scaleX(1)",
            transition: { duration: 1, type: "spring", velocity: 0.75, bounce: 0.65, delay: 0.15 },
        },
        fin: {
            opacity: 0,
            transform: "scaleX(0)",
        },
    };
    return (
        <AnimatePresence>
            <div>
                <motion.div
                    className="hero"
                    onClick={onClic}
                    initial="cache"
                    exit="fin"
                    whileInView="visible"
                    variants={variantes}
                >
                    <div className="relative">
                        <div className="flex gap-3 items-end justify-center">
                            <h1> Bienvenue sur le site de FilmFlix</h1>
                            <Link to="/films" className="bouton">
                                Voir notre collection
                            </Link>
                        </div>
                        <CassetteVideo></CassetteVideo>
                        <small className="text-xs">
                            "VHS Tape" (https://skfb.ly/ounuI) by Setsubou is licensed under Creative Commons
                            Attribution (http://creativecommons.org/licenses/by/4.0/).
                        </small>
                    </div>
                </motion.div>

                {/* <motion.div
                    className="hero h-1/2 bg-green-100"
                    initial="cache"
                    exit="fin"
                    whileInView="visible"
                    variants={variantes}
                >
                    Bloc infos
                </motion.div>

                <motion.div
                    className="hero h-1/2 bg-red-100"
                    initial="cache"
                    exit="fin"
                    whileInView="visible"
                    variants={variantes}
                >
                    Bloc infos
                </motion.div>
                <motion.div
                    className="hero h-1/2 bg-red-100"
                    initial="cache"
                    exit="fin"
                    whileInView="visible"
                    variants={variantes}
                >
                    Bloc infos
                </motion.div>
                <motion.div
                    className="hero h-1/2 bg-red-500"
                    initial="cache"
                    exit="fin"
                    whileInView="visible"
                    variants={variantes}
                >
                    Bloc infos
                </motion.div> */}
            </div>
        </AnimatePresence>
    );
}

export default HeroAccueil;
