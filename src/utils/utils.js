export function slugify(text) {
    // Convierte diéresis y tildes a su forma normal
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    text = text.replace(/[\u00C0-\u00C6\u00C8-\u00CB\u00CC-\u00CF\u00D2-\u00D6\u00D9-\u00DC]/g, '');
  
    // Convierte el texto a minúsculas, reemplaza espacios por guiones y elimina caracteres no alfanuméricos
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }