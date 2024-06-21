import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Upload from './pages/Upload';
import VideoList from './components/VideoList';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <nav>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/search">Buscar</Link></li>
                        <li><Link to="/upload">Subir Video</Link></li>
                        <li><Link to="/videos">Ver Videos</Link></li>
                    </ul>
                </nav>
                <main style={styles.main}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/search" component={Search} />
                        <Route path="/upload" component={Upload} />
                        <Route path="/videos" component={VideoList} />
                    </Switch>
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