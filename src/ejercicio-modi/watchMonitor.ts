import fs from 'fs'
import path from 'path'

/**
 * Funcion que observa si hay un cambio en un directorio
 * 
 * @param leer - Ruta del directorio a observar
 * @param escribir - Ruta del directorio a escribir
 */
function watchFile(leer: string, escribir: string) {
  fs.access(leer, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`El directorio de lectura "${leer}" no existe.`);
      process.exit(1)
    }
    fs.mkdir(escribir, { recursive: true }, (err) => {
      if (err) {
        console.log("Ha ocurrido un error a la hora de crear el directorio")
      }
      fs.watch(leer, (evento, file) => {
        if (file !== null) {
          let file_path = path.join(leer, file)
          commit(file_path, escribir)
        }
      })
    }); 
  });
}

/**
 * Funcion que simula un commit
 * 
 * @param file_path - Camino del fichero a escribir
 * @param escribir - Destino en donde escribir
 */
function commit(file_path: string, escribir: string) {
  fs.stat(file_path, (err, data) => {
    if(err) {
      console.log("Ha ocurrido un error en el fichero: ", path.basename(file_path))
    }
    let file_dst = path.join(escribir, path.basename(file_path) + "." + data.mtime.getTime() + ".bak")
    
    
    fs.copyFile(file_path, file_dst, (err) => {
      if(err) {
        console.log("Ha ocurrido un error a la hora de copiar el archivo: ", err.message)
      }
      console.log("Se ha copiado correctamente")
    })
  })
}

watchFile("./src/ejercicio-modi/prueba", "./src/ejercicio-modi/backup")