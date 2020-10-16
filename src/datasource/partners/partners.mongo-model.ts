import { RequiredString, RequiredMultiPolygon, RequiredPoint } from "../../services/basic-schema";
import { model, Schema } from "mongoose";
import { PartnersEntity } from "./partners.entity";

const partnersSchema = new Schema({
  id: RequiredString,
  tradingName: RequiredString,
  ownerName: RequiredString,
  document: RequiredString,
  coverageArea: RequiredMultiPolygon,
  address: RequiredPoint
});
partnersSchema.index({address: '2dsphere'});

export const PartnersModel = model<PartnersEntity>("partners", partnersSchema);
