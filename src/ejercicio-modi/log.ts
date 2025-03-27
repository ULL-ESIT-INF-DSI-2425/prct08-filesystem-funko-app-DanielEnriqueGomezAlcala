import fs from 'fs'
import path from 'path'

/**
 * Funcion que muestra las versiones existentes de un fichero
 * 
 * @param file_path - Camino hacia el fichero del cual queremos ver las versiones
 */
function log(file_path: string) {
  let path_copies = path.resolve(path.dirname(file_path), "../backup")
  let file_name = path.basename(file_path)

  fs.readdir(path_copies, (err, ficheros) => {
    if (err) {
      console.log("Ha ocurrido un error al abrir el directorio de backup")
      process.exit(1)
    }
    
    let filteredFiles = ficheros.filter(fichero => fichero.includes(file_name));
    
    filteredFiles.forEach((fichero, contador) => {
      console.log(`${fichero} -> V${contador}`)
    })
  })
}

//watchFile("./src/ejercicio-modi/prueba", "./src/ejercicio-modi/backup")
log("./src/ejercicio-modi/prueba/prueba.txt")