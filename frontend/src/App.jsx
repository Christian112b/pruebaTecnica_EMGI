import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './styles/App.css'

import ProjectForm from './components/ProjectFrom';
import ProjectsTable from "./components/ProjectsTable";
import ProjectDetails from "./components/ProjectDetails";
import AdvanceForm from "./components/AdvanceForm";

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [modalType, setModalType] = useState(null);

  const openModal = (type, projectId = null) => {
    setSelectedProjectId(projectId);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedProjectId(null);
    setModalType(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Gestión de Avances</h1>
        <button onClick={() => openModal("projectForm")}>+ Agregar Proyecto</button>
      </header>

      <main className="app-main">
        <ProjectsTable
          onView={(id) => openModal("details", id)}
          onAddAdvance={(id) => openModal("advance", id)}
        />
      </main>

      {/* Modal */}
      {modalType && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close" onClick={closeModal}>X</button>
            {modalType === "projectForm" && <ProjectForm onSuccess={closeModal} />}
            {modalType === "details" && <ProjectDetails projectId={selectedProjectId} />}
            {modalType === "advance" && <AdvanceForm projectId={selectedProjectId} onSuccess={closeModal} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
