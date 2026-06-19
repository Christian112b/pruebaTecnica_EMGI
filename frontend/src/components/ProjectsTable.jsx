import { useEffect, useState } from "react";
import "../styles/table.css"
import "../styles/modal.css";

import api from "../api";
import ProjectDetails from "./ProjectDetails";
import AdvanceForm from "./AdvanceForm";


export default function ProjectsTable() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
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
    setSelectedProjectId(id);
    setModalType("advance");
  };

  const closeModal = () => {
    setSelectedProjectId(null);
    setModalType(null);
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.costo_base}</td>
              <td>{p.fecha_inicio}</td>
              <td>{p.fecha_fin}</td>
              <td>
                <button onClick={() => openAdvanceForm(p.id)}>Agregar Avance</button>
                <button onClick={() => openDetails(p.id)} style={{ marginLeft: "0.5rem" }}>
                  Ver Proyecto
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalType && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div className="modal">


            <button onClick={closeModal} style={{ float: "right" }}>X</button>
            {modalType === "details" && <ProjectDetails projectId={selectedProjectId} />}
            {modalType === "advance" && <AdvanceForm projectId={selectedProjectId} onSuccess={closeModal} />}
          </div>
        </div>
      )}
    </div>
  );
}
