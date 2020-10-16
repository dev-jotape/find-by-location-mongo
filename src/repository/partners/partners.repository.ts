import { Service } from 'typedi'
import { PartnersInput } from '../../resolvers/partners/schema/partners.input'
import { PartnersDatasource } from '../../datasource/partners/partners.datasource'
import { PartnersEntity } from '../../datasource/partners/partners.entity';
import { PartnersResponse } from '../../resolvers/partners/schema/partners.object-type';
import { validaCpfCnpj } from '../../services/validateDocument'

@Service()
export class PartnersRepository {
  constructor(
    private partnersDatasource: PartnersDatasource,
  ) { }
  async getById(id): Promise<PartnersInput> {
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

    if (await this.partnerExist(partnerInput)) throw new Error("Partner already included");

    const partner = await this.partnersDatasource.createPartner(partnerInput)
    return partner as PartnersInput;
  }

  async partnerExist(partnerInput: PartnersInput): Promise<Boolean> {
    const partnerById = await this.partnersDatasource.getById(partnerInput.id);
    if (partnerById) return true;

    console.log(partnerInput.document)

    const partnerByDocument = await this.partnersDatasource.getByDocument(partnerInput.document);
    if (partnerByDocument) return true;

    return false;
  }

  async deletePartner(id: string): Promise<Boolean> {
    const partner = await this.partnersDatasource.deletePartner(id);
    return !!partner.ok
  }

  async searchPartner(lat: Number, long: Number): Promise<PartnersResponse> {
    const partnersByLocation = await this.findByLocation(lat, long);
    const partnersCoverageArea = await this.findByCoverageArea(lat, long);

    console.log(JSON.stringify(partnersByLocation))

    if (!partnersByLocation || !partnersByLocation.length || !partnersCoverageArea || !partnersCoverageArea.length) throw new Error("No Partner found");

    return this.filterPartner(partnersByLocation, partnersCoverageArea);
  }

  async filterPartner(partnersByLocation: PartnersEntity[], partnersCoverageArea: PartnersEntity[]): Promise<PartnersEntity> {
    for (let index = 0; index < partnersByLocation.length; index++) {
      const responsePartner = partnersCoverageArea.find(el => el.id === partnersByLocation[index].id)
      if (responsePartner) return responsePartner
    }

    throw new Error("No Partner found");
  }

  async findByCoverageArea(lat, long) {
    return this.partnersDatasource.findByCoverageArea(lat, long);
  }

  async findByLocation(lat, long) {
    return this.partnersDatasource.findByLocation(lat, long);
  }
}
