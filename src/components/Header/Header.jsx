import Nav from "../Nav/Nav";
import "./Header.css";
import { Link } from "react-router-dom";
import { motion, useScroll, AnimatePresence, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";

function Header() {
    const { scrollYProgress } = useScroll();
    const [headerVisible, setVisible] = useState(true);

    // useEffect(() => {
    //     scrollYProgress.on("change", (value) => {
    //         if (value > 0.2) {
    //             setVisible(false);
    //         } else {
    //             setVisible(true);
    //         }
    //     });
    // }, [scrollYProgress]);

    //Permet d'écouter le changement de la valeur de scrollYProgress
    // et de mettre à jour la valeur de headerVisible en conséquence
    useMotionValueEvent(scrollYProgress, "change", (value) => {
        if (document.body.scrollHeight <= window.innerHeight) {
            return;
        }

        //Si la page est scrollée de plus de 20% on cache le header
        if (value > 0.2) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    });

    return (
        <>
            {/* AnimatePresence permet de gérer les animations de sortie des composants (exit) */}
            <AnimatePresence>
                {headerVisible && (
                    <motion.header
                        initial={{ top: 0 }}
                        exit={{ top: "-100%", transition: { duration: 1 } }}
                        className="z-10"
                    >
                        <div>
                            <Link className="logo-container" to="/">
                                <motion.img
                                    initial={{ rotate: 0 }}
                                    animate={{
                                        rotate: [0, "360deg"],
                                        transition: { duration: 1 },
                                        type: "spring",
                                        stiffness: 50,
                                        damping: 20,
                                        bounce: 0.5,
                                    }}
                                    src="/logo.png"
                                    alt="logo"
                                    className="logo"
                                />
                                <p className="titre">FilmFlix</p>
                            </Link>
                        </div>
                        <Nav />
                    </motion.header>
                )}
            </AnimatePresence>
        </>
    );
}

export default Header;
