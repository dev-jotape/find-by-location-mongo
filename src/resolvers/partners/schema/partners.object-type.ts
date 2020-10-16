import { ObjectType, Field, Float } from 'type-graphql'
import { MultiPolygon, Point } from 'graphql-geojson-scalar-types'

@ObjectType()
export class PartnersResponse {
    @Field()
    id: string;

    @Field()
    tradingName: string;

    @Field()
    ownerName: string;

    @Field()
    document: string;

    @Field(type => MultiPolygon)
    coverageArea: MultiPolygon;

    @Field(type => Point)
    address: Point;
}
