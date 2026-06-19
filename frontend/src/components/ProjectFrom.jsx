import { useState } from "react";
import api from "../api";
import "../styles/form.css";

export default function ProjectForm({ onCreated }) {
  const [nombre, setNombre] = useState("");
  const [costoBase, setCostoBase] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!nombre.trim()) {
      alert("El nombre del proyecto es obligatorio ");
      return;
    }
    if (Number(costoBase) <= 0) {
      alert("El costo base debe ser mayor a 0 ");
      return;
    }
    if (!fechaInicio || !fechaFin) {
      alert("Las fechas de inicio y fin son obligatorias ");
      return;
    }
    if (new Date(fechaFin) < new Date(fechaInicio)) {
      alert("La fecha de fin no puede ser anterior a la fecha de inicio ");
      return;
    }

    try {
      const res = await api.post("/proyectos", {
        nombre,
        costo_base: Number(costoBase),
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      });
      alert("Proyecto creado con éxito");
      setNombre("");
      setCostoBase("");
      setFechaInicio("");
      setFechaFin("");
      window.location.reload();
      // if (onCreated) onCreated(res.data);

      
    } catch (err) {
      console.error(err);
      alert("Error al crear el proyecto ");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Proyecto</h2>
      <div>
        <label>Nombre:</label>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Costo Base:</label>
        <input
          type="number"
          value={costoBase}
          onChange={(e) => setCostoBase(e.target.value)}
          min="1"
          required
        />
      </div>
      <div>
        <label>Fecha Inicio:</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Fecha Fin:</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          required
        />
      </div>
      <button type="submit">Crear Proyecto</button>
    </form>
  );
}
