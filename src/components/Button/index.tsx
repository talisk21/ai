'use client'

import {Icon, IconType} from "@/components/Icon";
import {ComponentProps} from "react";
import './styles.scss';

export const enum ButtonVariant {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    ICON = 'icon-btn',
}

export type ButtonType = ComponentProps<"button"> & {
    children?: React.ReactNode;
    classNames?: string;
    icon?: IconType;
    iconOnTheRight?: boolean;
    variant?: ButtonVariant;
    isFullWidth?: boolean;
    isVisible?: boolean;
};

const Button: React.FC<ButtonType> = (props) => {
    const {
        type,
        icon,
        iconOnTheRight,
        isFullWidth = false,
        variant= ButtonVariant.PRIMARY,
        isVisible = true,
        children,
        classNames,
        ...otherProps
    } = props;

    return (
        <button
            type={type || "button"}
            className={`btn ${classNames ? classNames : ''} ${isFullWidth ? "full-width" : ""} ${variant} ${isVisible ? 'fade-in' : 'fade-out'}`}
            {...otherProps}
        >
            {icon && !iconOnTheRight ? (
                <span className="icon icon-left">
          <Icon name={icon} />
        </span>
            ) : null}
            {children}
            {icon && iconOnTheRight ? (
                <span className={`icon icon-right`}>
          <Icon name={icon} />
        </span>
            ) : null}
        </button>
    );
};

export default Button;
