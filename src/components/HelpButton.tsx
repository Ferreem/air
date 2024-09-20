import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StyledButton from "./StyledButton";
import AngleIcon from '../assets/angle.png';
import SelectIcon from '../assets/Select.png';
import DrawLineIcon from '../assets/LineDraw.png';

interface HelpButtonProps {
    children: string;
}

export default function HelpButton({ children }: HelpButtonProps) {
    const [clicked, setClicked] = useState<boolean>(false);

    const variants = {
        hidden: { 
            opacity: 0, 
            scale: 0.10,
            x: '-50%', 
            y: '-40%' 
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            x: '0%', 
            y: '0%',
            transition: { 
                type: 'spring',
                stiffness: 200,
                damping: 20
            }
        },
        exit: {
            opacity: 0,
            scale: 0.1,
            x: '-50%',
            y: '-40%',
            transition: {
                duration: 0.1
            }
        }
    };

    return (
        <>
            <StyledButton setClicked={setClicked} clicked={clicked}>{children}</StyledButton>

            <AnimatePresence>
                {clicked && (
                    <motion.div 
                        className="flex flex-col absolute left-12 top-0 p-4 rounded-md w-96"
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.9)'}}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                    >
                        <span className="font-semibold mb-2">
                            Draw line <img src={DrawLineIcon} alt="" className="w-3 inline-flex mr-1" style={{filter: 'invert(100%)'}} />
                            - <p className="font-normal inline-flex">Draw a line on the map</p>
                        </span>
                        <span className="font-semibold mb-2">
                            Select <img src={SelectIcon} alt="" className="w-3 inline-flex mr-1" style={{filter: 'invert(100%)'}} />
                            - <p className="font-normal inline-flex">Select objects on the map</p>
                        </span>
                        <span className="font-semibold">
                            Measure angle <img src={AngleIcon} alt="" className="w-3 inline-flex mr-1" style={{filter: 'invert(100%)'}} />
                            - <p className="font-normal inline-flex">Measure angles between points</p>
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}