import { useState } from "react";
import api from "../api";

export default function AdvanceForm({ projectId, onSuccess, initialPorcentaje }) {
  const today = new Date().toISOString().split("T")[0];

  const [fecha, setFecha] = useState(today);
  const [porcentaje, setPorcentaje] = useState(initialPorcentaje || 0);
  const [notas, setNotas] = useState("");
  const [materiales, setMateriales] = useState([{ nombre: "", cantidad: 0 }]);


  const handleMaterialChange = (index, field, value) => {
    const newMaterials = [...materiales];
    newMaterials[index][field] = value;
    setMateriales(newMaterials);
  };

  const addMaterial = () => {
    setMateriales([...materiales, { nombre: "", cantidad: 0 }]);
  };

  const removeMaterial = (index) => {
    const newMaterials = materiales.filter((_, i) => i !== index);
    setMateriales(newMaterials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!fecha) {
      alert("La fecha es obligatoria");
      return;
    }

    if (porcentaje < initialPorcentaje || porcentaje > 100) {
      alert(`El porcentaje debe ser entre ${initialPorcentaje} y 100 ❌`);
      return;
    }

    if (materiales.some(m => !m.nombre || Number(m.cantidad) <= 0)) {
      alert("Todos los materiales deben tener nombre y cantidad mayor a 0 ");
      return;
    }

    try {
      const body = {
        fecha,
        porcentaje_avance: Number(porcentaje),
        notas,
        materiales: materiales.map(m => ({
          nombre: m.nombre,
          cantidad: Number(m.cantidad)
        }))
      };

      await api.post(`/proyectos/${projectId}/avances`, body);
      alert("Avance agregado correctamente");
      if (onSuccess) onSuccess();
      window.location.reload();

      
    } catch (err) {
      console.error("Error creando avance:", err);
      alert("Error al crear avance");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Avance</h2>

      <label>Fecha:</label>
      <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />

      <label>Porcentaje de Avance:</label>
      <input type="number" value={porcentaje} onChange={(e) => setPorcentaje(e.target.value)} min="0" max="100" required />

      <label>Notas:</label>
      <textarea value={notas} onChange={(e) => setNotas(e.target.value)} />

      <h3>Materiales</h3>
      {materiales.map((m, i) => (
        <div key={i} style={{ marginBottom: "0.5rem", display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="Nombre"
            value={m.nombre}
            onChange={(e) => handleMaterialChange(i, "nombre", e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={m.cantidad}
            onChange={(e) => handleMaterialChange(i, "cantidad", e.target.value)}
            required
          />
          <button type="button" onClick={() => removeMaterial(i)} style={{ backgroundColor: "#CC4A20" }}>
            🗑️
          </button>
        </div>
      ))}
      <button type="button" onClick={addMaterial}>+ Agregar Material</button>

      <br /><br />
      <button type="submit">Guardar Avance</button>
    </form>
  );
}
