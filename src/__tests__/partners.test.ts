import { gql } from "apollo-boost";
import { connect, closeDatabase } from '../config/memory-server';
import { server } from '../config/setup';

let client, id;

beforeAll(async () => {
  client = await server();
  connect()
});
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
        createPartner: { 
          _id,
          tradingName,
          ownerName,
          document
        },
      },
    } = result;

    id = _id;

    expect(result).toBeTruthy();
    expect(_id).toBeTruthy();
    expect(document).toEqual('99999999999');
    expect(tradingName).toEqual('CD Marilia');
    expect(ownerName).toEqual('Toninho da Silva');
  });
});

describe("Test Search Partner", () => {
  it("should find a partner by Id", async () => {
    const partner = gql`
      query getPartnerById {
        getPartnerById(_id: "${id}") {
          _id
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
          _id,
          tradingName,
          ownerName,
          document,
        },
      },
    } = result;

    expect(result).toBeTruthy();
    expect(_id).toBeTruthy();
    expect(document).toEqual('99999999999');
    expect(tradingName).toEqual('CD Marilia');
    expect(ownerName).toEqual('Toninho da Silva');
  });

  it("should find a partner by location", async () => {
    const partner = gql`
      query searchPartner {
        searchPartner(lat: -22.200738, long: -49.955690) {
          _id
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
        searchPartner
      },
    } = result;

    expect(result).toBeTruthy();
    expect(searchPartner.length).toBe(1);
    expect(searchPartner[0]._id).toBeTruthy();
    expect(searchPartner[0].document).toEqual('99999999999');
    expect(searchPartner[0].tradingName).toEqual('CD Marilia');
    expect(searchPartner[0].ownerName).toEqual('Toninho da Silva');
  });
});

describe("Test remove Partner", () => {
  it("should remove a partner successfully", async () => {
    const deletedPartner = gql`
      mutation {
        deletePartner(_id: "${id}")
      }
    `;

    const result = await client.mutate({ mutation: deletedPartner });
    expect(result).toBeTruthy();
    expect(result.data.deletePartner).toBeTruthy();
  });
})