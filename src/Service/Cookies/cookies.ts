// cookies.ts

import { log } from 'console';
import Cookies from 'js-cookie';

// Función para crear una cookie
export function createCookie(name: string, data: any) {
  Cookies.set(name, data, { expires: 7, path: '/' }); // Ejemplo: cookie expira en 7 días
}

// Función para obtener el valor de una cookie
export function getCookie(name: string) {
  console.log(Cookies.get(name))
  return Cookies.get(name);
}
