// @ts-ignore Swell node doesn't have types
import swell from 'swell-node';
import { readFileSync, readdirSync } from 'node:fs';

function loadDotenvCreds(): [string | undefined, string | undefined] {
  let storeId: string | undefined = process.env.NEXT_PUBLIC_SWELL_STORE_ID;
  let secretKey: string | undefined = process.env.SWELL_SECRET_KEY;
  if (storeId !== undefined && secretKey !== undefined) {
    return [storeId, secretKey];
  }

  const dotEnv = readFileSync('.env.local').toString();
  for (const line of dotEnv.split('\n')) {
    const [envName, envValue] = line.split('=');
    if (envName === 'SWELL_SECRET_KEY') {
      secretKey = envValue;
    } else if (envName === 'NEXT_PUBLIC_SWELL_STORE_ID') {
      storeId = envValue;
    }
  }

  return [storeId, secretKey];
}

function loadSchema(name: string): object {
  return JSON.parse(readFileSync(`models/${name}`).toString());
}

async function createModels(swellClient: swell.Client) {
  for (const schemaName of readdirSync('models', { recursive: false })) {
    console.log(`Executing schema ${schemaName}...`);
    await swellClient.post('/:content', loadSchema(schemaName.toString()));
  }

  console.log('Marketlaunch is now successfully setup!');
  console.log('Before starting, please create the `buyer` and `vendor` customer groups by:');
  console.log('1. From the Swell dashboard, navigate to Settings > Customers');
  console.log('2. Select "Add customer group" under the Groups section');
  console.log('3. Add a group with the name `buyer`');
  console.log('4. Add a group with the name `vendor`');
}

async function deleteModels(swellClient: swell.Client) {
  for (let schemaName of readdirSync('setup/models', { recursive: false })) {
    console.log(`Deleting model customisation ${schemaName}...`);

    schemaName = schemaName.toString().replace('.json', '');
    await swellClient.delete(`/:content/${schemaName}`);
  }
}

const [storeId, secretKey] = loadDotenvCreds();
if (secretKey !== undefined && storeId !== undefined) {
  const isDeleting = process.argv[2] === 'delete';

  const swellClient = swell.init(storeId, secretKey);
  const promise = isDeleting ? deleteModels(swellClient) : createModels(swellClient);
  promise
    .then(() => process.exit(0))
    .catch((err) => {
      // This is unreliable and may not print correctly!
      console.error(err);
      process.exit(1);
    });
} else {
  console.error('SWELL_SECRET_KEY and/or NEXT_PUBLIC_SWELL_STORE_ID are not setup!');
  console.error('Please fill these values in, for this script and usage of the app.');
  process.exitCode = 1;
}
