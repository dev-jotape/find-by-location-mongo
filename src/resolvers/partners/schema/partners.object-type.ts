import { ObjectType, Field, Float } from 'type-graphql'
import { Point, Polygon } from 'graphql-geojson-scalar-types'

@ObjectType()
export class PartnersResponse {
    @Field()
    _id: string;

    @Field()
    tradingName: string;

    @Field()
    ownerName: string;

    @Field()
    document: string;

    @Field(type => Polygon)
    coverageArea: Polygon;

    @Field(type => Point)
    address: Point;
}
