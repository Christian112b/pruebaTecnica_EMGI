import { useEffect, useState } from "react";
import api from "../api";
import "../styles/details.css";

export default function ProjectDetails({ projectId }) {
  const [project, setProject] = useState(null);
  const [avances, setAvances] = useState([]);

  useEffect(() => {
    if (!projectId) return;

    api.get(`/proyectos/${projectId}`)
      .then(res => setProject(res.data))
      .catch(err => console.error("Error cargando proyecto:", err));

    api.get(`/proyectos/${projectId}/avances`)
      .then(res => setAvances(res.data))
      .catch(err => console.error("Error cargando avances:", err));
  }, [projectId]);

  if (!project) return <p className="loading">Cargando proyecto...</p>;

  return (
    <div className="details-container">
      <h2>Detalles del Proyecto</h2>
      <div className="project-card">
        <p><strong>ID:</strong> {project.id}</p>
        <p><strong>Nombre:</strong> {project.nombre}</p>
        <p><strong>Costo Base:</strong> ${project.costo_base}</p>
        <p><strong>Fecha Inicio:</strong> {project.fecha_inicio}</p>
        <p><strong>Fecha Fin:</strong> {project.fecha_fin}</p>
      </div>

      <h3>Avances</h3>
      {avances.length === 0 ? (
        <p className="no-avances">No hay avances registrados.</p>
      ) : (
        <ul className="avances-list">
          {avances.map(a => (
            <li key={a.id} className="avance-item">
              <span className="avance-fecha">{a.fecha}</span>
              <span className="avance-porcentaje">{a.porcentaje_avance}%</span>
              <span className="avance-notas">{a.notas}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
