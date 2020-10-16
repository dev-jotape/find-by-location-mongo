import { Document, Schema } from "mongoose";
import { MultiPolygon, Point } from 'graphql-geojson-scalar-types'

export interface PartnersEntity extends Document {
  id: string;
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: MultiPolygon;
  address: Point;
}
