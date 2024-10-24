import React from 'react';
import styles from '../styles/imageModal.module.css'; 

const ImageModal = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null; 

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <img src={imageUrl} alt="Recipe" className={styles.modalImage} />
            </div>
        </div>
    );
};

export default ImageModal;
