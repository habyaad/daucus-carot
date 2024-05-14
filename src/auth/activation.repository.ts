import { Repository } from 'typeorm';
import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activation } from './entities/activation.entity';
import { StringUtils } from 'src/common/helpers/string.utils';

@Injectable()
export class ActivationRepository extends Repository<Activation> {
  logger: Logger = new Logger();
  constructor(
    @InjectRepository(Activation)
    private activationRepository: Repository<Activation>,
  ) {
    super(
        activationRepository.target,
        activationRepository.manager,
        activationRepository.queryRunner,
    );
  }

}
