const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let db;

// ✅ Health check
app.get('/test', (req, res) => {
  res.send('✅ /test route is working!');
});


// *********** Employee APIs ***********

// GET all employees with department name
app.get('/employees', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        e.EmployeeID, e.FirstName, e.LastName, e.Email, e.Phone, 
        e.DateOfJoining, e.Position, d.DepartmentName
      FROM Employee e
      LEFT JOIN Department d ON e.DepartmentID = d.DepartmentID
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching employees', details: err.message });
  }
});

// Add employee
app.post('/add-employee', async (req, res) => {
  const { FirstName, LastName, Email, Phone, DateOfJoining, DepartmentID, Position } = req.body;
  if (!FirstName || !LastName || !Email) {
    return res.status(400).json({ error: 'Missing required fields: FirstName, LastName, Email' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO Employee (FirstName, LastName, Email, Phone, DateOfJoining, DepartmentID, Position)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [FirstName, LastName, Email, Phone, DateOfJoining, DepartmentID, Position]
    );
    res.json({ message: '✅ Employee added', insertId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error adding employee', details: err.message });
  }
});

// Update employee
app.put('/employee/:id', async (req, res) => {
  const { id } = req.params;
  const { FirstName, LastName, Email, Phone, DateOfJoining, DepartmentID, Position } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE Employee SET FirstName=?, LastName=?, Email=?, Phone=?, DateOfJoining=?, DepartmentID=?, Position=? WHERE EmployeeID=?`,
      [FirstName, LastName, Email, Phone, DateOfJoining, DepartmentID, Position, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Employee not found' });

    res.json({ message: '✅ Employee updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating employee', details: err.message });
  }
});

// Delete employee
app.delete('/employee/:id', async (req, res) => {
  try {
    const [result] = await db.query(`DELETE FROM Employee WHERE EmployeeID = ?`, [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: '🗑️ Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting employee', details: err.message });
  }
});

// *********** Department APIs ***********

app.get('/departments', async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM Department`);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching departments', details: err.message });
  }
});

app.post('/department', async (req, res) => {
  const { DepartmentName, ManagerID } = req.body;
  if (!DepartmentName) return res.status(400).json({ error: 'DepartmentName is required' });

  try {
    const [result] = await db.query(
      `INSERT INTO Department (DepartmentName, ManagerID) VALUES (?, ?)`,
      [DepartmentName, ManagerID || null]
    );
    res.status(201).json({ message: '✅ Department added', departmentId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error adding department', details: err.message });
  }
});

app.put('/department/:id', async (req, res) => {
  const { DepartmentName, ManagerID } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE Department SET DepartmentName=?, ManagerID=? WHERE DepartmentID=?`,
      [DepartmentName, ManagerID, req.params.id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Department not found' });

    res.json({ message: '✅ Department updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating department', details: err.message });
  }
});

app.delete('/department/:id', async (req, res) => {
  try {
    const [result] = await db.query(`DELETE FROM Department WHERE DepartmentID=?`, [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Department not found' });
    res.json({ message: '🗑️ Department deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting department', details: err.message });
  }
});

// *********** Salary APIs ***********

app.get('/salary/:employeeId', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM SalaryStructure WHERE EmployeeID = ? ORDER BY EffectiveFrom DESC LIMIT 1`,
      [req.params.employeeId]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'No salary record found' });
    res.json({ salary: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching salary', details: err.message });
  }
});

app.post('/salary', async (req, res) => {
  const { EmployeeID, BasicSalary, Allowances, EffectiveFrom, EffectiveTo = null } = req.body;
  if (!EmployeeID || !BasicSalary || !Allowances || !EffectiveFrom) {
    return res.status(400).json({ error: 'Missing required fields for salary' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO SalaryStructure (EmployeeID, BasicSalary, Allowances, EffectiveFrom, EffectiveTo)
       VALUES (?, ?, ?, ?, ?)`,
      [EmployeeID, BasicSalary, Allowances, EffectiveFrom, EffectiveTo]
    );
    res.status(201).json({ message: '✅ Salary record added', salaryStructureId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error inserting salary', details: err.message });
  }
});

app.put('/salary/:salaryStructureId', async (req, res) => {
  const { BasicSalary, Allowances, EffectiveFrom, EffectiveTo } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE SalaryStructure SET BasicSalary=?, Allowances=?, EffectiveFrom=?, EffectiveTo=? WHERE SalaryStructureID=?`,
      [BasicSalary, Allowances, EffectiveFrom, EffectiveTo, req.params.salaryStructureId]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: 'Salary record not found' });
    res.json({ message: '✅ Salary updated' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating salary', details: err.message });
  }
});

app.delete('/salary/:salaryStructureId', async (req, res) => {
  try {
    const [result] = await db.query(
      `DELETE FROM SalaryStructure WHERE SalaryStructureID = ?`,
      [req.params.salaryStructureId]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Salary record not found' });
    res.json({ message: '🗑️ Salary deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting salary', details: err.message });
  }
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error!' });
});

// ======== DATABASE CONNECTION & QUERY ROUTE ======== //
async function start() {
  try {
    // 1. Connect to MySQL
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Anwesh@2003', // 🔑 Verify this matches your MySQL
      database: 'salary_management' // 🔍 Confirm DB name
    });
    console.log('✅ Connected to MySQL');

    // 2. Define the /query route HERE
    app.post('/query', async (req, res) => {
      
      try {
        const [results] = await db.query(query);
        res.json({ results });
      } catch (err) {
        console.error('❌ Query failed:', err.message);
        res.status(500).json({ error: 'Database error', details: err.message });
      }
    });

    // 3. Start the server
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1); // Exit if critical error
  }
}

// 🚨 Start the server
start();

