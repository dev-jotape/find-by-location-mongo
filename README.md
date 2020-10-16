# Code Challenge

API Graphql para trabalhar com objetos [GIS](https://en.wikipedia.org/wiki/Geographic_information_system).
Possui 4 funções :

 1. Criar Parceiro
 2. Listar todos os parceiros
 3. Listar parceiro por ID
 4. Listar parceiro por localização (o parceiro mais próximo e que cuja área de cobertura inclua a localização)
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

### Run Docker
`docker-compose up`

### Run
`yarn start`
`yarn start:watch` (nodemon)

### Test
`yarn run test`

## Parceiro
Exemplo de parceiro: 

    {
    	  "id": 1, 
    	  "tradingName": "Adega da Cerveja - Pinheiros",
    	  "ownerName": "Zé da Silva",
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

    mutation CreatePartner($partner: PartnersInput!) {
        createPartner(partner: $partner) {
	        id
		    tradingName
		    ownerName
		    document
		    coverageArea
		    address
        }
      } 
Query Variables

  

     {
      "partner": {
        "id": "22", 
        "tradingName": "2Adega da Cerveja - Pinheiros",
        "ownerName": "2Zé da Silva",
        "document": "14321322123891/0001",
        "coverageArea": { 
          "type": "MultiPolygon", 
          "coordinates": [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
          ]
        },
        "address": { 
          "type": "Point",
          "coordinates": [-26.57421, -51.785741]
        }
      }
    }

### GetPartnerById

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

### SearchPartner (by location)

    query searchPartner {
      searchPartner(lat: 30.2, long: 20.3) {
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
      deletePartner(id: "1")
    }
