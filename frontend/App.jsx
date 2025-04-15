import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import DepartmentManager from './components/DepartmentManager';
import SalaryManager from './components/SalaryManager';
import QueryExecutor from './components/QueryManager';


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
            <li><Link to="/query" className="hover:underline">Query Executor</Link></li>
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
            <Route path="/query" element={<QueryExecutor />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}


// import React from 'react';
// // import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// // import EmployeeList from './components/EmployeeList';
// // import DepartmentManager from './components/DepartmentManager';
// // import SalaryManager from './components/SalaryManager';
// // import QueryExecutor from './components/QueryManager';

// function App() {
//   const testQueryRoute = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/query', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: 'SELECT 1' }), // A very simple query
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Test Query Response:', data);
//       } else {
//         console.error('Test Query Failed:', response.status, response.statusText);
//         const errorData = await response.json();
//         console.error('Error Data:', errorData);
//       }
//     } catch (error) {
//       console.error('Fetch Error:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Testing Query Endpoint</h1>
//       <button onClick={testQueryRoute}>Test /query</button>
//       {/*
//       <Router>
//         <div className="min-h-screen bg-gray-100">
//           <nav className="bg-blue-600 p-4 text-white shadow">
//             <ul className="flex gap-6 text-lg">
//               <li><Link to="/" className="hover:underline">Home</Link></li>
//               <li><Link to="/employees" className="hover:underline">Employees</Link></li>
//               <li><Link to="/department" className="hover:underline">Departments</Link></li>
//               <li><Link to="/salary" className="hover:underline">Salary</Link></li>
//               <li><Link to="/query" className="hover:underline">Query Executor</Link></li>
//               <li><Link to="/about" className="hover:underline">About</Link></li>
//             </ul>
//           </nav>

//           <main className="p-6">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/employees" element={<EmployeeList />} />
//               <Route path="/department" element={<DepartmentManager />} />
//               <Route path="/salary" element={<SalaryManager />} />
//               <Route path="/query" element={<QueryExecutor />} />
//               <Route path="/about" element={<About />} />
//             </Routes>
//           </main>
//         </div>
//       </Router>
//       */}
//     </div>
//   );
// }

// export default App;
