import { Injectable } from '@nestjs/common';
import { CreateParentDto } from 'src/parent/dto/create-parent.dto';
import { Parent } from 'src/parent/entities/parent.entity';
import { ParentService } from 'src/parent/parent.service';

@Injectable()
export class AuthService {
    constructor(private readonly parentService: ParentService){}

    async createParentAccount(createParentDto: CreateParentDto): Promise<Parent> {
        return await this.parentService.create(createParentDto);
    }

}
