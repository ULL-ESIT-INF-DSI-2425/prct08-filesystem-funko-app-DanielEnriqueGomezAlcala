import * as fs from 'fs'
import * as path from 'path';

function listar(directorio: string) {
  fs.readdir(directorio, (err, files) => {
    if (err) {
      console.log("Ha ocurrido un error a la hora de leer el directorio ", err)
    }

    files.forEach(file => {
      let fichero_path = path.join(directorio, file)

      fs.stat(fichero_path, (err, stats) => {
        if(err) {
          console.log("Ha ocurrido un error en el fichero: ", file)
        }

        console.log(`nombre: ${file}, tamaño: ${stats.size}, fecha modificacion: ${stats.mtime}`)
      })
    })
  })
}

// listar("./src/ejercicio-1")

function eliminar(archivo: string) {
  // Copiar a un directorio reciclaje
  fs.copyFile(archivo, path.join("./src/ejercicios_aux/reciclaje/", "prueba1.txt"), (err) => {
    if (err) {
      console.log("Ha ocurrido un error copiando el archivo: ", err);
      process.exit(1);
    }
    console.log("Se ha copiado correctamente");

    // Eliminar del directorio original después de la copia
    fs.unlink(archivo, (err) => {
      if (err) {
        console.log("Ha ocurrido un error eliminando el archivo: ", err);
        return;
      }
      console.log(`Archivo ${archivo} eliminado correctamente`);
    });
  });
}

function mover(ruta_old: string, ruta_nueva: string ) {
  fs.rename(ruta_old, ruta_nueva, (err) => {
    if (err) {
      console.log("No se ha podido mover las cosas", err)
      process.exit(1)
    }
    console.log("Se ha completado el cambio")
  })
}

function buscar(ruta: string, extension: string) {
  fs.readdir(ruta, {recursive: true}, (err, files) => {
    if(err) {
      console.log("Ha ocurrido un error a la hora de leer el directorio")
      process.exit(1)
    }
  
    let resultado = files.map(a => a.toString()).filter(a => path.extname(a) === extension);
    console.log(resultado)
  })
}
// mover("./src/ejercicios_aux/reciclaje/prueba1.txt", "./src/prueba1.txt")
buscar("./src/ejercicio-1", ".ts")
