import "./HeroAccueil.css";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function HeroAccueil() {
    let [visite, setVisite] = useState(true);

    function onClic() {
        setVisite(!visite);
    }

    const variantes = {
        cache: { opacity: 0, translateX: -1000 },
        visible: {
            opacity: 1,
            translateX: 0,
            transition: { duration: 1 },
        },
        fin: {
            opacity: 0,
            translateX: -1000,
        },
    };
    return (
        <div>
            <motion.div className="hero" onClick={onClic} initial="cache" animate="visible" variants={variantes}>
                {visite ? <h1>Merci d&apos;avoir visité FilmFlix</h1> : <h1> Bienvenue sur le site de FilmFlix</h1>}
            </motion.div>

            <AnimatePresence>
                {visite && (
                    <motion.div
                        className="hero h-1/2 bg-green-100"
                        initial="cache"
                        animate="visible"
                        exit="fin"
                        variants={variantes}
                    >
                        Bloc infos
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="hero h-1/2 bg-red-100"
                initial="cache"
                whileInView="visible"
                exit="fin"
                variants={variantes}
            >
                Bloc infos
            </motion.div>
            <motion.div
                className="hero h-1/2 bg-red-100"
                initial="cache"
                whileInView="visible"
                exit="fin"
                variants={variantes}
            >
                Bloc infos
            </motion.div>
            <motion.div
                className="hero h-1/2 bg-red-100"
                initial="cache"
                whileInView="visible"
                exit="fin"
                variants={variantes}
            >
                Bloc infos
            </motion.div>
        </div>
    );
}

export default HeroAccueil;
