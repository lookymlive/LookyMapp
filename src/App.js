import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Upload from './pages/Upload';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <main style={styles.main}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/upload" element={<Upload />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

const styles = {
    main: {
        padding: '1rem',
    },
};

export default App;