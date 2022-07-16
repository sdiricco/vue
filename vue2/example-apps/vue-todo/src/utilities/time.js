export const today = new Date();
export const yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date());

export const sameDay = (d1, d2) => d1.getDate() === d2.getDate() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getFullYear() === d2.getFullYear();