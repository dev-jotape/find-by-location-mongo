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
              "id": "1",
              "tradingName": "Adega Osasco",
              "ownerName": "Ze da Ambev",
              "document": "02.453.716/000170",
              "coverageArea": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                      [
                          [
                            -43.36556,
                            -22.99669
                          ],
                          [
                            -43.36539,
                            -23.01928
                          ],
                          [
                            -43.26583,
                            -23.01802
                          ],
                          [
                            -43.25724,
                            -23.00649
                          ],
                          [
                            -43.23355,
                            -23.00127
                          ],
                          [
                            -43.2381,
                            -22.99716
                          ],
                          [
                            -43.23866,
                            -22.99649
                          ],
                          [
                            -43.24063,
                            -22.99756
                          ],
                          [
                            -43.24634,
                            -22.99736
                          ],
                          [
                            -43.24677,
                            -22.99606
                          ],
                          [
                            -43.24067,
                            -22.99381
                          ],
                          [
                            -43.24886,
                            -22.99121
                          ],
                          [
                            -43.25617,
                            -22.99456
                          ],
                          [
                            -43.25625,
                            -22.99203
                          ],
                          [
                            -43.25346,
                            -22.99065
                          ],
                          [
                            -43.29599,
                            -22.98283
                          ],
                          [
                            -43.3262,
                            -22.96481
                          ],
                          [
                            -43.33427,
                            -22.96402
                          ],
                          [
                            -43.33616,
                            -22.96829
                          ],
                          [
                            -43.342,
                            -22.98157
                          ],
                          [
                            -43.34817,
                            -22.97967
                          ],
                          [
                            -43.35142,
                            -22.98062
                          ],
                          [
                            -43.3573,
                            -22.98084
                          ],
                          [
                            -43.36522,
                            -22.98032
                          ],
                          [
                            -43.36696,
                            -22.98422
                          ],
                          [
                            -43.36717,
                            -22.98855
                          ],
                          [
                            -43.36636,
                            -22.99351
                          ],
                          [
                            -43.36556,
                            -22.99669
                          ]
                      ]
                    ]
                ]
              },
              "address": {
                "type": "Point",
                "coordinates": [
                    -43.297337,
                    -23.013538
                ]
              }
          }
    }

### GetPartnerById

    query getPartnerById {
      getPartnerById(id: "1") {
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
      deletePartner(id: "1")
    }
