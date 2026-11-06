import React, { useState } from 'react';
import { Container, Button, Form, InputGroup, Row, Col, Card, Nav } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Merancang Arsitektur Database Klinik', priority: 'High', status: 'In Progress', createdAt: '06/11/2026, 20.00.00' },
    { id: 2, name: 'Optimasi Tampilan Frontend Glassmorphism', priority: 'Medium', status: 'To Do', createdAt: '06/11/2026, 21.00.00' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleShowForm = () => setShowForm(true);

  const handleCloseForm = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), createdAt: new Date().toLocaleString('id-ID') }]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const showEditForm = (task) => {
    setTaskToEdit(task);
    handleShowForm();
  };

  // Statistik Tugas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const todoTasks = tasks.filter(t => t.status === 'To Do').length;

  // Filter pencarian dan status tab
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        {/* Header Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">🚀 Enterprise Task Hub</h2>
            <p className="text-muted mb-0">Kelola produktivitas dan alur kerja proyek dengan efisien.</p>
          </div>
          <Button variant="dark" onClick={handleShowForm} className="mt-3 mt-md-0 px-4 py-2 shadow-sm rounded-pill fw-semibold">
            <i className="bi bi-plus-lg me-2"></i>+ New Task
          </Button>
        </div>

        {/* Dashboard Metrics Row */}
        <Row className="mb-4 g-3">
          <Col xs={6} md={3}>
            <Card className="border-0 shadow-sm bg-white border-start border-4 border-primary">
              <Card.Body className="py-3">
                <span className="text-muted small fw-semibold">Total Tasks</span>
                <h3 className="fw-bold mb-0 text-primary">{totalTasks}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="border-0 shadow-sm bg-white border-start border-4 border-warning">
              <Card.Body className="py-3">
                <span className="text-muted small fw-semibold">To Do</span>
                <h3 className="fw-bold mb-0 text-warning">{todoTasks}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="border-0 shadow-sm bg-white border-start border-4 border-info">
              <Card.Body className="py-3">
                <span className="text-muted small fw-semibold">In Progress</span>
                <h3 className="fw-bold mb-0 text-info">{inProgressTasks}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="border-0 shadow-sm bg-white border-start border-4 border-success">
              <Card.Body className="py-3">
                <span className="text-muted small fw-semibold">Completed</span>
                <h3 className="fw-bold mb-0 text-success">{completedTasks}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Search and Filter Toolbar */}
        <Card className="border-0 shadow-sm mb-4 p-3 bg-white">
          <Row className="g-3 align-items-center">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text className="bg-transparent border-end-0">🔍</InputGroup.Text>
                <Form.Control 
                  className="border-start-0 shadow-none" 
                  placeholder="Cari berdasarkan nama tugas..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <Nav variant="pills" defaultActiveKey="All" className="justify-content-md-end gap-1">
                {['All', 'To Do', 'In Progress', 'Done'].map((status) => (
                  <Nav.Item key={status}>
                    <Nav.Link 
                      eventKey={status} 
                      active={statusFilter === status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1 rounded-pill small ${statusFilter === status ? 'bg-dark text-white' : 'text-secondary bg-light'}`}
                    >
                      {status}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
          </Row>
        </Card>

        {/* Task List Component */}
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          showEditForm={showEditForm}
        />

        {/* Task Form Modal */}
        <TaskForm 
          show={showForm} 
          handleClose={handleCloseForm} 
          addTask={addTask} 
          editTask={editTask} 
          taskToEdit={taskToEdit} 
        />
      </Container>
    </div>
  );
}

export default App;