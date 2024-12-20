import { ReactNode, useEffect } from 'react';
import styles from './Modal.module.scss';
import classNames from 'classnames';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div 
                className={classNames(styles.modal, className)} 
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    className={styles.closeButton} 
                    onClick={onClose}
                >
                    <img src="/exit.png" alt="exit"></img>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
