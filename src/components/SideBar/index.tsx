import React from 'react';
import './styles.scss';
import ReactDOM from 'react-dom';

interface SidebarProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
                                                    title,
                                                    isOpen,
                                                    onClose,
                                                    children
                                                }) => {
    return ReactDOM.createPortal(
        <div className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
            <div className="sidebar__header">
                <h2 className="sidebar__title">{title}</h2>
                <button className="sidebar__close" onClick={onClose}>×</button>
            </div>
            <div className="sidebar__content">
                {children}
            </div>
        </div>
        ,
        document.getElementById('modal-root')!
    );
};

export default Sidebar;