import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Funko, Tipo, Genero } from './funko.js';
import { FunkoCollection } from './funkoCollection.js';

/**
 * Configuración de los comandos de yargs.
 */
yargs(hideBin(process.argv))
  // Comando: add
  .command(
    'add',
    'Añade un nuevo Funko a la colección de un usuario',
    {
      user: {
        description: 'Nombre del usuario',
        type: 'string',
        demandOption: true,
      },
      id: {
        description: 'ID único del Funko',
        type: 'number',
        demandOption: true,
      },
      name: {
        description: 'Nombre del Funko',
        type: 'string',
        demandOption: true,
      },
      desc: {
        description: 'Descripción del Funko',
        type: 'string',
        demandOption: true,
      },
      type: {
        description: 'Tipo de Funko (Pop, Pop Rides, Vinyl Soda, Vinyl Gold)',
        type: 'string',
        choices: Object.values(Tipo), // Asegura que solo se acepten valores del enum
        demandOption: true,
      },
      genre: {
        description: 'Género del Funko (Animación, Películas y TV, Videojuegos, Deportes, Música, Ánime)',
        type: 'string',
        choices: Object.values(Genero), // Asegura que solo se acepten valores del enum
        demandOption: true,
      },
      franchise: {
        description: 'Franquicia del Funko',
        type: 'string',
        demandOption: true,
      },
      number: {
        description: 'Número identificativo del Funko dentro de la franquicia',
        type: 'number',
        demandOption: true,
      },
      exclusive: {
        description: 'Indica si el Funko es exclusivo (true/false)',
        type: 'boolean',
        demandOption: true,
      },
      marketValue: {
        description: 'Valor de mercado del Funko',
        type: 'number',
        demandOption: true,
      },
    },
    (argv) => {
      try {
        // Crear una instancia de Funko
        const funko = new Funko(
          argv.id,
          argv.name,
          argv.desc,
          argv.type as Tipo,
          argv.genre as Genero,
          argv.franchise,
          argv.number,
          argv.exclusive,
          argv.marketValue
        );

        // Intentar añadir el Funko
        const aux = new FunkoCollection(argv.user);
        aux.add(funko);

        console.log(`✅ Funko "${argv.name}" añadido con éxito a la colección de ${argv.user}`);
      } catch (error) {
        console.error("❌ Error al añadir el Funko:", error);
      }
    }
  )
  .help() // Habilitar la opción --help
  .strict() // Evitar argumentos desconocidos
  .parse(); // Ejecutar yargs
