'use client'

import React from 'react';
import './styles.scss';

type CardPropsType = {
    children?: React.ReactNode | React.ReactNode[];
    classNames?: string;
}

const Card: React.FC<CardPropsType> = ({ children, classNames }) => {
    return (
        <div className={`card${classNames ? ' '+classNames : ''}`}>
            {children}
        </div>
    )
}

export default Card;