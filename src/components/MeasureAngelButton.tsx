import { useState } from "react";
import StyledButton from "./StyledButton";

interface MeasureAngelButton {
    children: string;
}

export default function MeasureAngelButton({children}: MeasureAngelButton) {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    return (
        <>
            <StyledButton setClicked={setIsClicked}>{children}</StyledButton>
        </>
    )
}
