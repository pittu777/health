import { memo } from "react";

const Myinput = ({ user: { name, age }, onClick }: { user: { name: string, age: number }, onClick: () => void }) => {
    console.log("child render");
    return <div onClick={onClick}>{name},{age}</div>
}

export default memo(Myinput);