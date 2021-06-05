import { PartnersModel } from './partners.mongo-model'
import { Service } from 'typedi'
import { PartnersEntity } from './partners.entity'
import { PartnersInput } from '../../resolvers/partners/schema/partners.input'

@Service()
export class PartnersDatasource {
    getById(_id: string): Promise<PartnersEntity> {
        return PartnersModel.findOne({ _id }).exec()
    }

    getByDocument(document: string): Promise<PartnersEntity> {
        return PartnersModel.findOne({ document }).exec()
    }

    getAll() {
        return PartnersModel.find().exec()
    }

    createPartner(partnerInput: PartnersInput): Promise<PartnersEntity> {
        return PartnersModel.create(partnerInput)
    }

    deletePartner(id: string) {
        return PartnersModel.deleteOne({ id }).exec()
    }

    findByCoverageArea(long, lat) {
        return PartnersModel.find({
            coverageArea: {
                $geoIntersects: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lat, long]
                    }
                }
            },
            address: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lat, long]
                    }
                }
            }
        })
    }
}
