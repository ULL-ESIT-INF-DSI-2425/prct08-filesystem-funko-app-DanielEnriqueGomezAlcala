import * as fs from 'fs'
import * as path from 'path';

if (process.argv.length < 4) {
  console.log("La llamada a el programa es con 4 parametros")
  process.exit(1)
}

console.log(`Llamada al programa con los parametros:\n ${process.argv}`)

let file_entrada = path.resolve(process.argv[2])
let file_salida = path.resolve(process.argv[3])

function JsonToCSV(data: { [key: string]: any }[]) {
  console.log(data)
  
  const headers = Object.keys(data[0])
  const rows = data.map(row => 
    headers.map(header => row[header]).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
  
}

function cargarDatos(file_entrada: string, file_salida: string) {
  fs.readFile(file_entrada, 'utf8', (err, data) => {
    if (err) {
      console.log(`Ha ocurrido un error al leer el fichero`)
      process.exit()
    }
  
    const jsondata = JSON.parse(data)
    const csv = JsonToCSV(jsondata)

    fs.writeFile(file_salida, csv, 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir el archivo CSV:', err);
        return;
      }
      console.log('Archivo CSV guardado correctamente.');
    })
  })
}

cargarDatos(file_entrada, file_salida)
