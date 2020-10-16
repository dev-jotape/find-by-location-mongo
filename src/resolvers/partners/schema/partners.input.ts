import { InputType, Field, Float } from 'type-graphql'
import { MultiPolygon, Point } from 'graphql-geojson-scalar-types'

@InputType()
export class PartnersInput {
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
