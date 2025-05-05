// src/data/carpetas.js
import { reactive } from 'vue';
import { slugify } from '@/utils/utils.js';


// Inicializar las carpetas personales con una carpeta de ejemplo
export const carpetas = reactive([
  { id: 1, nombre: 'Viaje España', lugares: [] },
]);


// Función para agregar una carpeta personal
export function agregarCarpeta(nombre) {
    if (!nombre) {
        alert('El nombre de la carpeta no puede estar vacío.');
        return;
    }

    // Comprobar si ya existe una carpeta con el mismo nombre
    const carpetaExistente = carpetas.find((c) => slugify(c.nombre) === slugify(nombre));
    if (carpetaExistente) {
        alert(`Ya existe una carpeta con el nombre "${nombre}".`);
        return;
    }

    // Crear la nueva carpeta si no existe
    const nuevaCarpeta = { id: Date.now(), nombre, lugares: [] };
    carpetas.push(nuevaCarpeta);
    alert(`Carpeta "${nombre}" creada con éxito.`);
}


// Función para agregar un lugar a una carpeta personal
export function agregarLugarACarpeta(carpetaId, lugar) {
  const carpeta = carpetas.find((c) => c.id === carpetaId);
  if (!carpeta) return false;

  const slugLugar = slugify(lugar.name);
  const yaExiste = carpeta.lugares.some(
    (l) => slugify(l.name) === slugLugar
  );
  
  if (yaExiste) return false;
  carpeta.lugares.push(lugar);
  return true;
}

// Función para eliminar un lugar de una carpeta personal
export function eliminarLugarDeCarpeta(carpetaId, lugar) {
  const carpeta = carpetas.find((c) => c.id === carpetaId);
  if (carpeta) {
    const index = carpeta.lugares.indexOf(lugar);
    if (index > -1) {
      carpeta.lugares.splice(index, 1);
    }
  } else {
    alert('Carpeta no encontrada');
  }
}

// Función para eliminar una carpeta personal
export function eliminarCarpeta(carpetaId) {
  const index = carpetas.findIndex((c) => c.id === carpetaId);
  if (index > -1) {
    carpetas.splice(index, 1);
    alert('Carpeta eliminada con éxito.');
  } else {
    alert('Carpeta no encontrada');
  }
}

// Función para renombrar una carpeta personal
export function renombrarCarpeta(carpetaId, nuevoNombre) {
  const carpeta = carpetas.find((c) => c.id === carpetaId);
  if (carpeta) {
    // Comprobar si ya existe una carpeta con el mismo nombre
    const carpetaExistente = carpetas.find((c) => slugify(c.nombre) === slugify(nuevoNombre));
    if (carpetaExistente) {
      alert(`Ya existe una carpeta con el nombre "${nuevoNombre}".`);
      return;
    }
    carpeta.nombre = nuevoNombre;
    alert(`Carpeta renombrada a "${nuevoNombre}" con éxito.`);
  } else {
    alert('Carpeta no encontrada');
  }
}
