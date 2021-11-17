import { InMemoryCache } from "@apollo/client";


export const APOLLO_CACHE = new InMemoryCache()

// typePolicies: {
//   // Pool: {
//   //   // Singleton types that have no identifying field can use an empty
//   //   // array for their keyFields.
//   //   keyFields: ["pair"],
//   // },
//   Query: {
//     fields: {
//       darkMode() {
//         return darkModeVar();
//       },
//     },
//   },
// },