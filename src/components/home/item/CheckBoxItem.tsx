import { BsCheck } from "react-icons/bs";

const CheckBoxItem = ({ isCompleted }: any) => {
    return (
        <div className="flex h-auto items-center">
            <div className="flex border-solid border-2 border-zinc-400 h-5 w-5 rounded-lg mr-2">
                {isCompleted && <BsCheck className="text-zinc-400" size={16} />}
            </div>
        </div>
    );
};

export default CheckBoxItem;
