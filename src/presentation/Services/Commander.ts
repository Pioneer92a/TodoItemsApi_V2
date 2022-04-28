import { Command } from "commander";
const program = new Command();

program
  .option("-d, --debug", "output extra debugging", true)
  .option("-p, --port-number [type]", "specify port for express server") // this will be set to true if the user doesnt specify it
  .parse();

const options = program.opts();
// if (options.debug) console.log(options);

let portNumber: string;
if (options.portNumber) {
  // if user didn't specify port number then make it 3000
  portNumber = options.portNumber === true ? "3000" : options.portNumber;
}

export { portNumber };
