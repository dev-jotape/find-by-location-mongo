import { Service } from 'typedi'
import { PartnersInput } from '../../resolvers/partners/schema/partners.input'
import { PartnersDatasource } from '../../datasource/partners/partners.datasource'
import { PartnersEntity } from '../../datasource/partners/partners.entity';
import { PartnersResponse } from '../../resolvers/partners/schema/partners.object-type';

@Service()
export class PartnersRepository {
  constructor(
    private partnersDatasource: PartnersDatasource,
  ) { }
  async getById(id: string): Promise<PartnersInput> {
    const partner = await this.partnersDatasource.getById(id);
    if(!partner) throw new Error("No Partner found");
    return partner as PartnersInput;
  }

  async getAll(): Promise<PartnersInput[]> {
    const partner = await this.partnersDatasource.getAll();
    return partner as PartnersInput[];
  }

  async createPartner(partnerInput: PartnersInput): Promise<PartnersInput> {
    partnerInput.document = partnerInput.document.replace(/\D/gim, '')
    const partner = await this.partnersDatasource.createPartner(partnerInput)
    return partner as PartnersInput;
  }

  async deletePartner(id: string): Promise<Boolean> {
    const partner = await this.partnersDatasource.deletePartner(id);
    return !!partner.ok
  }

  async searchPartner(long: Number, lat: Number): Promise<PartnersResponse[]> {
    const partnersCoverageArea = await this.findByCoverageArea(long, lat);
    if (
      !partnersCoverageArea || 
      !partnersCoverageArea.length
      ) throw new Error("No Partner found");

    return partnersCoverageArea;
  }

  async filterPartner(partnersByLocation: PartnersEntity[], partnersCoverageArea: PartnersEntity[]): Promise<PartnersEntity> {
    for (let index = 0; index < partnersByLocation.length; index++) {
      const responsePartner = partnersCoverageArea.find(el => el.id === partnersByLocation[index].id)
      if (responsePartner) return responsePartner
    }

    throw new Error("No Partner found");
  }

  async findByCoverageArea(long, lat) {
    return this.partnersDatasource.findByCoverageArea(long, lat);
  }
}
