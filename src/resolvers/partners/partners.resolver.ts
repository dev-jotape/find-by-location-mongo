import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { PartnersInput } from './schema/partners.input'
import { PartnersResponse } from './schema/partners.object-type'
import { PartnersRepository } from '../../repository/partners/partners.repository'

@Resolver()
export class PartnersResolver {
  constructor(
    private partnersRepository: PartnersRepository
  ) { }

  @Query(returns => [PartnersResponse])
  getPartners() {
    return this.partnersRepository.getAll()
  }

  @Query(returns => PartnersResponse)
  getPartnerById(@Arg('_id') id: string) {
    return this.partnersRepository.getById(id)
  }

  @Mutation(returns => PartnersResponse)
  createPartner(@Arg('partner') partner: PartnersInput) {
    return this.partnersRepository.createPartner(partner);
  }

  @Mutation(returns => Boolean)
  deletePartner(@Arg('id') id: string) {
    return this.partnersRepository.deletePartner(id);
  }

  @Query(returns => [PartnersResponse])
  searchPartner(
    @Arg('lat') lat: Number,
    @Arg('long') long: Number,
  ) {
    return this.partnersRepository.searchPartner(long, lat)
  }
}
