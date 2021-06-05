import { Document } from "mongoose";
import { Point, Polygon } from 'graphql-geojson-scalar-types'

export interface PartnersEntity extends Document {
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: Polygon;
  address: Point;
}
