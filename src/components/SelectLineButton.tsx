import React, { useState } from "react";
import StyledButton from "./StyledButton";

interface SelectLineButton {
    children: React.ReactNode;
}

export default function SelectLineButton({children}: SelectLineButton) {
    const [clicked, setClicked] = useState(false);

    return (
        <>
            <StyledButton setClicked={setClicked} clicked={clicked}> {children}</StyledButton>
        </>
    )
}
