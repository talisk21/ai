import {memo, useMemo} from "react";

import ChipAi from '@/assets/svg-icons/chip-ai.svg'
import Close from "@/assets/svg-icons/close.svg";
import OutlineClock from '@/assets/svg-icons/clock-outline.svg'
import Clear from '@/assets/svg-icons/clear.svg'
import Calendar from "@/assets/svg-icons/calendar.svg";
import WasteBin from '@/assets/svg-icons/waste-bin.svg';

export const icons = {
    'chip-ai': ChipAi,
    "close": Close,
    'clock': OutlineClock,
    'clear': Clear,
    'calendar': Calendar,
    'waste-bin': WasteBin,
}

export type IconType = keyof typeof icons;

export type IconProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    name: IconType;
    className?: string;
};

export const Icon: React.FC<IconProps> = memo(({ name = "arrow-left", className="" }) => {
    const IconComponent = useMemo(() => icons[name as IconType], [name]);

    return <IconComponent className={`icon icon-${name} ${className}`}/>;
});

Icon.displayName = "Icon";

export default Icon;
