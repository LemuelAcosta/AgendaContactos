import React from "react";

export default function MultipleContactos({
  contactos,
  seleccionados,
  setSeleccionados,
}) {
    
  function toggle(id) {
    setSeleccionados((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  function remove(id) {
    setSeleccionados((prev) => prev.filter((x) => x !== id));
  }

  return (
    <div>
      <select
        onChange={(e) => {
          const id = e.target.value;
          if (!id) return;
          toggle(id);
        }}
        value=""
      >
        <option value="">Agregar contacto</option>

        {contactos.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre} {c.apellido}
          </option>
        ))}
      </select>

      <div style={{ marginTop: 10 }}>
        {seleccionados.map((id) => {
          const cont = contactos.find((x) => x.id === id);
          if (!cont) return null;

          return (
            <div key={id} style={{ display: "flex", gap: 8 }}>
              <span>
                {cont.nombre} {cont.apellido}
              </span>

              <button type="button" onClick={() => remove(id)}>
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}