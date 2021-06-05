import { gql } from "apollo-boost";
import { client } from "./config/setup";
import { connect, closeDatabase } from './config/memory-server';

beforeAll(async () => connect());
afterAll(async () => closeDatabase());

describe("Test Create Partner", () => {
  it("should create a partner successfully", async () => {
    const createPartner = gql`
      mutation {
        createPartner(partner: {
          tradingName: "CD Marilia",
          ownerName: "Toninho da Silva",
          document: "99999999999",
          coverageArea: { 
            type: "Polygon", 
            coordinates: [
              [
                [-22.199537, -49.976083],[-22.221122, -49.972595], [-22.216581, -49.933960], [-22.189877, -49.945984], [-22.199537, -49.976083]
              ]
            ]
          },
          address: { 
            type: "Point",
            coordinates: [-22.207205, -49.958582]
          }
        }) {
          _id
          tradingName
          document
          coverageArea
          address
        }
      }
    `;

    const result = await client.mutate({ mutation: createPartner });

    const {
      data: {
        createPartner: { id, document },
      },
    } = result;

    expect(result).toBeTruthy();
    expect(id).toBeTruthy();
    expect(document).toBeTruthy();
  });

  // it("should return error when trying to create a partner with a same document", async () => {
  //   const createPartner = gql`
  //     mutation {
  //       createPartner(partner: {
  //         tradingName: "CD Marilia",
  //         ownerName: "Toninho da Silva",
  //         document: "93639240000168",
  //         coverageArea: { 
  //           type: "Polygon", 
  //           coordinates: [
  //             [
  //               [-22.199537, -49.976083],[-22.221122, -49.972595], [-22.216581, -49.933960], [-22.189877, -49.945984], [-22.199537, -49.976083]
  //             ]
  //           ]
  //         },
  //         address: { 
  //           type: "Point",
  //           coordinates: [-22.207205, -49.958582]
  //         }
  //       }) {
  //         _id
  //         tradingName
  //         document
  //         coverageArea
  //         address
  //       }
  //     }
  //   `;

  //   await expect(client.mutate({ mutation: createPartner })).rejects.toThrow("GraphQL error: E11000 duplicate key error collection: test.partners index: document_1 dup key: { document: \"93639240000168\" }");
  // });
});

// describe("Test Search Partner", () => {
//   it("should find a partner by Id", async () => {
//     const partner = gql`
//       query getPartnerById {
//         getPartnerById(id: "some_user_id") {
//           id
//           tradingName
//           ownerName
//           document
//           coverageArea
//           address
//         }
//       }
//     `;

//     const result = await client.mutate({ mutation: partner });

//     const {
//       data: {
//         getPartnerById: {
//           id,
//           tradingName,
//           ownerName,
//           document,
//           coverageArea,
//           address
//         },
//       },
//     } = result;

//     expect(result).toBeTruthy();
//     expect(id).toBeTruthy();
//     expect(document).toBeTruthy();
//     expect(tradingName).toBeTruthy();
//     expect(ownerName).toBeTruthy();
//     expect(coverageArea).toBeTruthy();
//     expect(address).toBeTruthy();
//   });

//   it("should find a partner by location", async () => {
//     const partner = gql`
//       query searchPartner {
//         searchPartner(lat: -46.57421, long: -21.785741) {
//           id
//           tradingName
//           ownerName
//           document
//           coverageArea
//           address
//         }
//       }
//     `;

//     const result = await client.mutate({ mutation: partner });

//     const {
//       data: {
//         searchPartner: {
//           id,
//           tradingName,
//           ownerName,
//           document,
//           coverageArea,
//           address
//         },
//       },
//     } = result;

//     expect(result).toBeTruthy();
//     expect(id).toBeTruthy();
//     expect(document).toBeTruthy();
//     expect(tradingName).toBeTruthy();
//     expect(ownerName).toBeTruthy();
//     expect(coverageArea).toBeTruthy();
//     expect(address).toBeTruthy();
//   });
// });

// describe("Test remove Partner", () => {
//   it("should remove a partner successfully", async () => {
//     const deletedPartner = gql`
//       mutation {
//         deletePartner(id: "some_user_id")
//       }
//     `;

//     const result = await client.mutate({ mutation: deletedPartner });

//     expect(result).toBeTruthy();
//     expect(result.data.deletePartner).toBeTruthy();
//   });
// })