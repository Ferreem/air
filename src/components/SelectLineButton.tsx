import { useState } from "react";
import StyledButton from "./StyledButton";

interface SelectLineButton {
    children: string;
}

export default function SelectLineButton({children}: SelectLineButton) {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    return (
        <>
            <StyledButton setClicked={setIsClicked}>{children}</StyledButton>
        </>
    )
}
