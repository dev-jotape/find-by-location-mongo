# Code

Graphql API to deals with [GIS](https://en.wikipedia.org/wiki/Geographic_information_system) objects.
Code functions:

 1. Create Partner
 2. List all partners
 3. Get partner by ID
 4. Search partners by location (which the coverage area includes the location)
 5. Delete partner

## Technologies

 1. Node
 2. Typescript
 3. Graphql
 4. MongoDB
 5. Jest
 6. Docker

## Get started
### Install
`yarn` OR `npm install`

### Run
`docker-compose up`

### Test
`yarn test`

## Partner
JSON example: 

    {
      "getPartnerById": {
        "_id": "60bbbe68ff671a038d4ba20a",
        "tradingName": "CD Marilia",
        "ownerName": "Toninho da Silva",
        "document": "83639240000168",
        "coverageArea": {
          "coordinates": [
            [
              [
                -22.199537,
                -49.976083
              ],
              [
                -22.221122,
                -49.972595
              ],
              [
                -22.216581,
                -49.93396
              ],
              [
                -22.189877,
                -49.945984
              ],
              [
                -22.199537,
                -49.976083
              ]
            ]
          ],
          "type": "Polygon"
        },
        "address": {
          "type": "Point",
          "coordinates": [
            -22.199656,
            -49.95326
          ]
        }
      }
    }
   
   

 1. The `coverageArea` field follows the [GeoJSON Polygon](https://en.wikipedia.org/wiki/GeoJSON) format
 2. The `address` field follows the [GeoJSON Point](https://en.wikipedia.org/wiki/GeoJSON) format
 3. The `document` must be a unique field

## Examples
### CreatePartner
Mutation:  

    mutation {
      createPartner(partner: {
        tradingName: "CD Marilia 2",
        ownerName: "Toninho da Silva",
        document: "93639240000168",
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

### GetPartnerById

    query getById {
      getPartnerById(_id: "60bbbe68ff671a038d4ba20a") {
        _id
        tradingName
        ownerName
        document
        coverageArea
        address
      }
    }

### SearchPartner (by location)

    query searchPartnerByLocation {
      searchPartner(lat: -22.200738, long: -49.955690)  {
        _id
        tradingName
        address
      }
    }
 ### DeletePartner
 

    mutation deletePartner {
      deletePartner(_id: "60bbe42526d984002d46396f") 
    }
