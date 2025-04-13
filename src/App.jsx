import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import DepartmentManager from './components/DepartmentManager';
import SalaryManager from './components/SalaryManager';


function Home() {
  return <h2 className="text-2xl font-bold">Welcome to the Salary Management System</h2>;
}

function About() {
  return <h2 className="text-2xl font-bold">Built with ❤️ by Anwesh</h2>;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="bg-blue-600 p-4 text-white shadow">
          <ul className="flex gap-6 text-lg">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/employees" className="hover:underline">Employees</Link></li>
            <li><Link to="/department" className="hover:underline">Departments</Link></li>
            <li><Link to="/salary" className="hover:underline">Salary</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/department" element={<DepartmentManager />} />
            <Route path="/salary" element={<SalaryManager />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
