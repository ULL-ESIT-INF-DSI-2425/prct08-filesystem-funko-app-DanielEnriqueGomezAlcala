// Cree un programa que lea un archivo de logs y que cuente la cantidad de ocurrencias de ciertas palabras clave como, 
// por ejemplo, "ERROR", "WARNING" e "INFO". Tanto la ruta del archivo con los logs, como la palabra clave a ser 
// buscada deberán indicarse desde línea de comandos. Busque información sobre cómo gestionar el paso de parámetros 
// desde línea de comandos en Node.js.

import * as fs from 'fs'
import * as path from 'path';
import { argv } from 'process';

if (process.argv.length < 4) {
  console.log("La llamada a el programa es con 4 parametros")
  process.exit(1)
}

console.log(`Llamada al programa con los parametros:\n ${process.argv}`)

let file_path = path.resolve(argv[2])
let word = argv[3]

function countWord(data: string, word: string) {
  let words = data.split(/\s+/); // Split by any whitespace character
  let filtro = words.filter(a => a === word);
  return filtro.length;
}

function cargarDatos(file_path: string, word: string) {
  fs.readFile(file_path, 'utf8', (err, data) => {
    if (err) {
      console.log("Ha ocurrido un problema a la hora de leer el archivo: ", err)
      return
    }

    let aux = countWord(data, word)
    console.log(`Ha aparecido la palabra ${word} un total de ${aux} veces.`)
  })
}

cargarDatos(file_path, word)