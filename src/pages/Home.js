import React from 'react';
import VideoCard from '../components/VideoCard';

const Home = () => {
    const videos = [
        { id: 1, title: 'Tienda de ropa XYZ', thumbnail: 'https://via.placeholder.com/300x200.png?text=Tienda+XYZ' },
        { id: 2, title: 'Zapatería ABC', thumbnail: 'https://via.placeholder.com/300x200.png?text=Zapatería+ABC' },
        { id: 3, title: 'Joyería 123', thumbnail: 'https://via.placeholder.com/300x200.png?text=Joyería+123' },
    ];

    return (
        <div>
            <h2>Videos Recientes</h2>
            <div style={styles.videoGrid}>
                {videos.map(video => (
                    <VideoCard key={video.id} title={video.title} thumbnail={video.thumbnail} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    videoGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
};

export default Home;