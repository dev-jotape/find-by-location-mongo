# Code Challenge

API Graphql para trabalhar com objetos [GIS](https://en.wikipedia.org/wiki/Geographic_information_system).
Possui 5 funções :

 1. Criar Parceiro
 2. Listar todos os parceiros
 3. Obter parceiro por ID
 4. Obter parceiro por localização (o parceiro mais próximo e que cuja área de cobertura inclua a localização)
 5. Excluir parceiro

## Tecnologias utilizadas

 1. Node
 2. Typescript
 3. Graphql
 4. MongoDB
 5. Jest

## Get started
### Install
`yarn` 
`npm install`

### Run
`docker-compose up`

### Test
`yarn run test`

## Parceiro
Exemplo de parceiro: 

    {
    	  "id": 1, 
    	  "tradingName": "CD Pinheiros",
    	  "ownerName": "Toninho da Silva",
    	  "document": "1432132123891/0001",
    	  "coverageArea": { 
    	    "type": "MultiPolygon", 
    	    "coordinates": [
    	      [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
    	      [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
    	    ]
    	  },
    	  "address": { 
    	    "type": "Point",
    	    "coordinates": [-46.57421, -21.785741]
    	  }
    }
   
   

 1. O campo `coverageArea` segue o formato [GeoJSON MultiPolygon](https://en.wikipedia.org/wiki/GeoJSON)
 2. O campo `address` segue o formato [GeoJSON Point](https://en.wikipedia.org/wiki/GeoJSON)
 3. Os campos `id` e `document` devem ser únicos entre os parceiros

## Exemplos
### CreatePartner
Mutation:  

    mutation CreatePartner {
      createPartner(partner: {
        id: 1, 
        tradingName: "CD Pinheiros",
        ownerName: "Toninho da Silva",
        document: "1432132123891/0001",
        coverageArea: { 
          type: "Polygon", 
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
        document
        coverageArea
        address
      }
    } 

### GetPartnerById

    query getPartnerById {
      getPartnerById(id: 1) {
        id
        tradingName
        ownerName
        document
        coverageArea
        address
      }
    }

### SearchPartner (by location)

    query searchPartner {
      searchPartner(long: -43.30355, lat: -23.01327) {
        id
        tradingName
        ownerName
        document
        coverageArea
        address
      }
    }
 ### DeletePartner
 

    mutation delete {
      deletePartner(id: 1)
    }
