import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Calculator from './components/Calculator';
import Homepage from './containers/Homepage';
import GenericCalculator from './components/GenericCalculator';

function App() {
    return (
        <div style={{ backgroundColor: '#f1f1f1' }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/compound-interests" element={<Calculator />} />
                    <Route path="/simulate-compound-interests" element={<GenericCalculator route={'simulate-compound-interests'} />} />
                    <Route path="/simulate-simple-interests" element={<GenericCalculator route={'simulate-simple-interests'} />} />
                    <Route path="/simulate-linear-depreciation" element={<GenericCalculator route={'simulate-linear-depreciation'} />} />
                    <Route path="/simulate-linear-depreciation-time" element={<GenericCalculator route={'simulate-linear-depreciation-time'} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
