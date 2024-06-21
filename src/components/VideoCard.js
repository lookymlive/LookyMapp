import React from 'react';

const VideoCard = ({ title, thumbnail }) => {
    return (
        <div style={styles.card}>
            <img src={thumbnail} alt={title} style={styles.thumbnail} />
            <h3 style={styles.title}>{title}</h3>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '1rem',
        margin: '1rem',
        maxWidth: '300px',
    },
    thumbnail: {
        width: '100%',
        height: 'auto',
    },
    title: {
        marginTop: '0.5rem',
    },
};

export default VideoCard;