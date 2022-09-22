import { PropsWithChildren} from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface ButtonWeekProps extends PropsWithChildren {
    title:string
    description:string;
    value: string;
    active?: boolean;
}

export const ButtonWeek = ({description, active = false, ...rest}:ButtonWeekProps) => {
    let itemBackground = active ? 'bg-violet-500' : 'bg-zinc-900';
    return(
        <ToggleGroup.Item                    
            className={`w-8 h-8 rounded ${itemBackground}`}
            {...rest}
        >
            {description}
        </ToggleGroup.Item>        
    );
}
