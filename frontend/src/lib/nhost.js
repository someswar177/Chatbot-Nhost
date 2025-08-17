import { NhostClient } from '@nhost/nhost-js'

const nhost = new NhostClient({
  subdomain: 'ctvvnpalxppmbnqswokp',
  region: 'ap-south-1',
})

// const nhost = new NhostClient({
//   backendUrl: 'https://backend-ctvvnpalxppmbnqswokp.nhost.run',
// //   graphqlUrl: 'https://ctvvnpalxppmbnqswokp.hasura.ap-south-1.nhost.run/v1/graphql',
// })

export { nhost }