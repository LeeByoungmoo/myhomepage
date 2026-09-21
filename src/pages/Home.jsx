import { Link } from 'react-router-dom';
import { BookOpen, Gamepad2, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-container animate-fade-in">
      <div className="split-layout">
        <Link to="/novels" className="split-panel panel-novels">
          <div className="panel-content">
            <div className="icon-wrapper">
              <BookOpen size={48} strokeWidth={1.5} />
            </div>
            <h2>Cyber Fiction</h2>
            <p>Immerse yourself in dark, thrilling narratives and dystopian futures.</p>
            <span className="action-btn">Read Novels <ArrowRight size={20} /></span>
          </div>
          <div className="panel-bg overlay-magenta"></div>
        </Link>
        
        <Link to="/games" className="split-panel panel-games">
          <div className="panel-content">
            <div className="icon-wrapper">
              <Gamepad2 size={48} strokeWidth={1.5} />
            </div>
            <h2>Interactive Experiences</h2>
            <p>Play web-based games, from casual classics to unique challenges.</p>
            <span className="action-btn">Play Games <ArrowRight size={20} /></span>
          </div>
          <div className="panel-bg overlay-blue"></div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
