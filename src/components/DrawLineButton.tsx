import React from "react";
import StyledButton from "./StyledButton";

interface DrawLineButtonProps {
    children: string;
    setClicked: (clicked: (prev: boolean) => boolean) => void;
}

export default function DrawLineButton({ children, setClicked }: DrawLineButtonProps) {
    return (
        <StyledButton setClicked={setClicked}>{children}</StyledButton>
    );
}