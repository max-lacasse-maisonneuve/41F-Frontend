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

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        if (document.body.scrollHeight <= window.innerHeight) {
            return;
        }

        if (value > 0.2) {
            setVisible(false);
        } else {
            setVisible(true);
        }
    });

    return (
        <>
            <AnimatePresence>
                {headerVisible && (
                    <motion.header initial={{ top: 0 }} exit={{ top: "-100%", transition: { duration: 1 } }}>
                        <div>
                            <Link className="logo-container" to="/">
                                <motion.img
                                    initial={{ rotate: 0 }}
                                    animate={{
                                        rotate: [0, "360deg", "45deg"],
                                        transition: { ease: "easeOut", duration: 5, times: [0, 0.2, 1] },
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
