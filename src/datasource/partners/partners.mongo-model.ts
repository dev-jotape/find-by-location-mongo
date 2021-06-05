import { RequiredString, RequiredPolygon, RequiredPoint, RequiredNumber } from "../../helpers/basic-schema";
import { model, Schema } from "mongoose";
import { PartnersEntity } from "./partners.entity";

const partnersSchema = new Schema({
  tradingName: RequiredString,
  ownerName: RequiredString,
  document: RequiredString,
  coverageArea: RequiredPolygon,
  address: RequiredPoint
});
partnersSchema.index({address: '2dsphere'});
partnersSchema.index({document: 1}, { unique: true });

export const PartnersModel = model<PartnersEntity>("partners", partnersSchema);
