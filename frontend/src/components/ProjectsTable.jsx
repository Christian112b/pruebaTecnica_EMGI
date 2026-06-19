import { useEffect, useState } from "react";
import "../styles/table.css";
import "../styles/modal.css";

import api from "../api";
import ProjectDetails from "./ProjectDetails";
import AdvanceForm from "./AdvanceForm";

export default function ProjectsTable() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null)
  const [modalType, setModalType] = useState(null); // "details" o "advance"

  useEffect(() => {
    api.get("/proyectos")
      .then(res => setProjects(res.data))
      .catch(err => console.error("Error cargando proyectos:", err));
  }, []);

  const openDetails = (id) => {
    setSelectedProjectId(id);
    setModalType("details");
  };

  const openAdvanceForm = (id) => {
    const proyecto = projects.find(p => p.id === id); // busca el proyecto en la lista
    setSelectedProjectId(id);
    setSelectedProject(proyecto); // guarda el proyecto completo
    setModalType("advance");
  };

  const closeModal = () => {
    setSelectedProjectId(null);
    setModalType(null);
  };

  function formatNumber(num) {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + "M"; // millones
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + "K"; // miles
    } else {
      return num.toString();
    }
  }


  const deleteProject = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este proyecto?")) return;
    try {
      await api.delete(`/proyectos/${id}`);
      setProjects(projects.filter(p => p.id !== id));
      alert("Proyecto eliminado correctamente");
    } catch (err) {
      console.error("Error eliminando proyecto:", err);
      alert("Error al eliminar proyecto");
    }
  };

  return (
    <div>
      <h2>Lista de Proyectos</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Costo Base</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Porcentaje</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{formatNumber(p.costo_base)}</td>
              <td>{p.fecha_inicio}</td>
              <td>{p.fecha_fin}</td>
              <td>{p.porcentaje_avance + '%'} </td>
              <td style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => openAdvanceForm(p.id)}>Agregar Avance</button>
                <button onClick={() => openDetails(p.id)}>Ver Proyecto</button>
                <button
                  onClick={() => deleteProject(p.id)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalType && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={closeModal} className="close">X</button>
            {modalType === "details" && <ProjectDetails projectId={selectedProjectId} />}
            {modalType === "advance" && <AdvanceForm projectId={selectedProjectId} initialPorcentaje={selectedProject?.porcentaje_avance} onSuccess={closeModal} />}
          </div>
        </div>
      )}
    </div>
  );
}
