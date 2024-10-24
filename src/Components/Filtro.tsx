import React, { useState, useMemo } from "react";

interface Filtro {
  items: string[];
}

const ListaFiltro: React.FC<Filtro> = ({ items }) => {
  const [textoFiltrado, setTextoFiltrado] = useState<string>("");

  const ItemFiltrado = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(textoFiltrado.toLowerCase())
    );
  }, [items, textoFiltrado]);

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar"
        value={textoFiltrado}
        onChange={(e) => setTextoFiltrado(e.target.value)}
        style={{width:"150%", borderRadius: '8px', height:'50px'}}
      />

      <ul>
        {ItemFiltrado.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaFiltro;
