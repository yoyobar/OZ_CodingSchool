import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoContainer from './components/TodoContainer';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<TodoContainer />} />
            </Routes>
        </Router>
    );
}

export default App;
