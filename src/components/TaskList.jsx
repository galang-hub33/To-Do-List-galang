import React from 'react';
import { Button, Card, Badge, Row, Col } from 'react-bootstrap';

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
  // Warna Badge Prioritas: High (Merah), Medium (Kuning), Low (Hijau)
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High': return 'danger';    // Merah
      case 'Medium': return 'warning';  // Kuning
      case 'Low': return 'success';     // Hijau
      default: return 'secondary';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Done': return 'success';
      case 'In Progress': return 'info';
      case 'To Do': return 'secondary';
      default: return 'secondary';
    }
  };

  if (tasks.length === 0) {
    return (
      <Card className="border-0 shadow-sm text-center py-5 bg-white">
        <Card.Body>
          <p className="text-muted mb-1 fs-5">📭 Tidak ada tugas ditemukan</p>
          <small className="text-muted">Coba ubah filter pencarian atau buat tugas baru.</small>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Row className="g-3">
      {tasks.map((task) => (
        <Col xs={12} key={task.id}>
          <Card className="border-0 shadow-sm bg-white hover-shadow transition-all">
            <Card.Body className="p-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center">
              <div className="mb-3 mb-md-0">
                <div className="d-flex align-items-center gap-2 mb-2">
                  {/* Badge Prioritas dengan warna spesifik */}
                  <Badge bg={getPriorityBadge(task.priority)} className="px-2 py-1 text-uppercase fw-bold" style={{ fontSize: '0.7rem' }}>
                    {task.priority} Priority
                  </Badge>
                  <Badge bg={getStatusBadge(task.status)} className="px-2 py-1 text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                    {task.status}
                  </Badge>
                </div>
                <h5 className="mb-1 fw-bold text-dark">{task.name}</h5>
                <small className="text-muted">
                  🕒 Dibuat pada: {task.createdAt || 'Baru saja'}
                </small>
              </div>
              
              <div className="d-flex gap-2">
                <Button 
                  variant="light" 
                  size="sm" 
                  className="px-3 rounded-pill border fw-semibold text-primary" 
                  onClick={() => showEditForm(task)}
                >
                  ✏️ Edit
                </Button>
                <Button 
                  variant="light" 
                  size="sm" 
                  className="px-3 rounded-pill border fw-semibold text-danger" 
                  onClick={() => deleteTask(task.id)}
                >
                  🗑️ Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TaskList;