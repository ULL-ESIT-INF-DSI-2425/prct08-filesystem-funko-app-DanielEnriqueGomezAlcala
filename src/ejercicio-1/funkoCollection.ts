import { Funko } from "./funko.js";
import { Tipo } from "./funko.js";
import { Genero } from "./funko.js";
import chalk from "chalk";
import * as fs from 'fs';
import * as path from 'path';

export class FunkoCollection {
  lista: Funko[] = []
  src_path: string
  usuario: string

  constructor(user: string) {
    this.usuario = user
    this.src_path = path.resolve("./src/ejercicio-1/usuarios", user)
    this.read()
  }

  read() {
    fs.readdir(this.src_path, (err, archivos) => {
      if(err) {
        console.log(chalk.red(`Ha ocurrido un error leyendo los datos de ${this.usuario}`))
        process.exit(1)
      }
      archivos.forEach(archivo => {
        let archivo_ruta = path.join(this.src_path, archivo)
        fs.readFile(archivo_ruta, 'utf8', (err, funko) => {
          if(err) {
            console.log(chalk.red(`Ha ocurrido un error leyendo los datos del fichero: ${archivo}`))
          }
          let funko_aux: Funko = JSON.parse(funko)
          this.lista.push(funko_aux)
        })
      })
    })
    console.log(chalk.green(`Se han cargado los datos de ${this.usuario} correctamente`))
  }

  add(funko: Funko) {
    let index = this.lista.findIndex(a => a.id === funko.id)
    if(index !== -1) {
      console.log(chalk.red(`Ya existe un funko con ese id: ${funko.id}`))
    }

    const archivo_path = path.join(this.src_path, `${funko.id}.json`)
    fs.writeFile(archivo_path, JSON.stringify(funko.toJSON()), 'utf8', (err) => {
      if (err) {
        console.log(chalk.red(`Ha ocurrido un error escribiendo el archivo: ${archivo_path}`));
      } else {
        this.lista.push(funko)
        console.log(chalk.green(`Funko añadido correctamente: ${funko.id}`));
      }
    })
  }

  eliminar(funko: Funko) {
    let index = this.lista.findIndex(a => a.id === funko.id)

    if (index === -1) {
      console.log(chalk.red("No existe el Funko"))
    }
    
    let archivo_camino = path.join(this.src_path, `${funko.id}.json`)
    fs.unlink(archivo_camino, (err) => {
      if (err) {
        console.log(chalk.red(`Ha ocurrido un error al eliminar el funko: ${err.message}`))
      }
    })
    this.lista.splice(index, 1)
    console.log(chalk.green("Se ha eliminado el funko correctamente"))
  }

  listar() {
    this.lista.forEach(funko => {
      let color;
      if (funko.valor > 75) {
      color = chalk.green;
      } else if (funko.valor > 50) {
      color = chalk.yellow;
      } else if (funko.valor > 25) {
      color = chalk.blue;
      } else {
      color = chalk.red;
      }

      console.log(`ID: ${funko.id}`);
      console.log(`Nombre: ${funko.nombre}`);
      console.log(`Descripción: ${funko.descripcion}`);
      console.log(`Tipo: ${funko.tipo}`);
      console.log(`Género: ${funko.genero}`);
      console.log(`Franquicia: ${funko.franquicia}`);
      console.log(`Número: ${funko.numero}`);
      console.log(`Exclusivo: ${funko.exclusivo}`);
      console.log(`Valor de mercado: ${color(funko.valor)}`);
      console.log('-------------------------');
    });
  }
}

// let aux: FunkoCollection = new FunkoCollection("danienri")

// const funko1 = new Funko(
//   1,
//   "Iron Man",
//   "Un superhéroe de Marvel",
//   Tipo.POP,
//   Genero.ANIMACION,
//   "Marvel",
//   1,
//   false,
//   5
// );

// const funko2 = new Funko(
//   2,
//   "Batman",
//   "Un superhéroe de DC",
//   Tipo.POP,
//   Genero.ANIMACION,
//   "DC",
//   1,
//   false,
//   30
// );

// const funko3 = new Funko(
//   3,
//   "Wonder Woman",
//   "Una superheroína de DC",
//   Tipo.POP,
//   Genero.ANIMACION,
//   "DC",
//   1,
//   false,
//   60
// );

// const funko4 = new Funko(
//   4,
//   "Hulk",
//   "Un superhéroe de Marvel",
//   Tipo.POP,
//   Genero.ANIMACION,
//   "Marvel",
//   1,
//   false,
//   100
// );

// setTimeout(() => {
//   // aux.add(funko1)
//   // aux.add(funko2)
//   // aux.add(funko3)
//   // aux.add(funko4)
//   //aux.eliminar(funko1);
//   aux.listar()
// }, 100);

