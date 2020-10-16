import { gql } from "apollo-boost";
import { client } from "./setup";

describe("Test Create Partner", () => {
  it("should create a partner successfully", async () => {
    const createPartner = gql`
      mutation {
        createPartner(partner: {
          id: "some_user_id", 
          tradingName: "Adega da Cerveja - Pinheiros",
          ownerName: "Zé da Silva",
          document: "41.953.090/0001-12",
          coverageArea: { 
            type: "MultiPolygon", 
            coordinates: [
              [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
              [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
            ]
          },
          address: { 
            type: "Point",
            coordinates: [-46.57421, -21.785741]
          }
        }) {
          id
          tradingName
          ownerName
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

  it("should return error when trying to create a partner with a same id", async () => {
    const createPartner = gql`
      mutation {
        createPartner(partner: {
          id: "some_user_id", 
          tradingName: "Adega da Cerveja - Pinheiros",
          ownerName: "Zé da Silva",
          document: "41.953.090/0001-12",
          coverageArea: { 
            type: "MultiPolygon", 
            coordinates: [
              [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
              [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
            ]
          },
          address: { 
            type: "Point",
            coordinates: [-26.57421, -51.785741]
          }
        }) {
          id
          tradingName
          ownerName
          document
          coverageArea
          address
        }
      }
    `;

    await expect(client.mutate({ mutation: createPartner })).rejects.toThrow("GraphQL error: Partner already included");
  });

  it("should return error when trying to create a partner with a some document", async () => {
    const createPartner = gql`
      mutation {
        createPartner(partner: {
          id: "11111", 
          tradingName: "Adega da Cerveja - Pinheiros",
          ownerName: "Zé da Silva",
          document: "41.953.090/0001-12",
          coverageArea: { 
            type: "MultiPolygon", 
            coordinates: [
              [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
              [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
            ]
          },
          address: { 
            type: "Point",
            coordinates: [-26.57421, -51.785741]
          }
        }) {
          id
          tradingName
          ownerName
          document
          coverageArea
          address
        }
      }
    `;

    await expect(client.mutate({ mutation: createPartner })).rejects.toThrow("GraphQL error: Partner already included");
  });
});

describe("Test Search Partner", () => {
  it("should find a partner by Id", async () => {
    const partner = gql`
      query getPartnerById {
        getPartnerById(id: "some_user_id") {
          id
          tradingName
          ownerName
          document
          coverageArea
          address
        }
      }
    `;

    const result = await client.mutate({ mutation: partner });

    const {
      data: {
        getPartnerById: {
          id,
          tradingName,
          ownerName,
          document,
          coverageArea,
          address
        },
      },
    } = result;

    expect(result).toBeTruthy();
    expect(id).toBeTruthy();
    expect(document).toBeTruthy();
    expect(tradingName).toBeTruthy();
    expect(ownerName).toBeTruthy();
    expect(coverageArea).toBeTruthy();
    expect(address).toBeTruthy();
  });

  it("should find a partner by location", async () => {
    const partner = gql`
      query searchPartner {
        searchPartner(lat: -46.57421, long: -21.785741) {
          id
          tradingName
          ownerName
          document
          coverageArea
          address
        }
      }
    `;

    const result = await client.mutate({ mutation: partner });

    const {
      data: {
        searchPartner: {
          id,
          tradingName,
          ownerName,
          document,
          coverageArea,
          address
        },
      },
    } = result;

    expect(result).toBeTruthy();
    expect(id).toBeTruthy();
    expect(document).toBeTruthy();
    expect(tradingName).toBeTruthy();
    expect(ownerName).toBeTruthy();
    expect(coverageArea).toBeTruthy();
    expect(address).toBeTruthy();
  });
});

describe("Test remove Partner", () => {
  it("should remove a partner successfully", async () => {
    const deletedPartner = gql`
      mutation {
        deletePartner(id: "some_user_id")
      }
    `;

    const result = await client.mutate({ mutation: deletedPartner });

    expect(result).toBeTruthy();
    expect(result.data.deletePartner).toBeTruthy();
  });
})