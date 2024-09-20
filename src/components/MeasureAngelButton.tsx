import { useState } from "react";
import StyledButton from "./StyledButton";

interface MeasureAngelButton {
    children: string;
}

export default function MeasureAngelButton({children}: MeasureAngelButton) {
    const [clicked, setClicked] = useState<boolean>(false);

    return (
        <>
            <StyledButton setClicked={setClicked} clicked={clicked}>{children}</StyledButton>
        </>
    )
}
