import { InputType, Field } from 'type-graphql'
import { Point, Polygon } from 'graphql-geojson-scalar-types'

@InputType()
export class PartnersInput {
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
