import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('add', 'Adds a funko', {
  id: {
   description: 'Funko ID',
   type: 'number',
   demandOption: true
  }
 }, (argv) => {
  console.log(argv.id);
 })
 .help()
 .argv;