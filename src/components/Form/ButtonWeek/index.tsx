import { PropsWithChildren} from 'react';

interface ButtonWeekProps {
    title:string
    description:string;
}

export const ButtonWeek = ({description, title}:ButtonWeekProps) => {
    return(
        <button title={title}
            className="w-8 h-8 rounded bg-zinc-900"
        >{description}</button>
    );
}