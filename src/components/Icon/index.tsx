import {memo, useMemo} from "react";

import ChipAi from '@/assets/svg-icons/chip-ai.svg'

export const icons = {
    'chip-ai': ChipAi,

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
