import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTableDto } from './create-user_table.dto';

export class UpdateUserTableDto extends PartialType(CreateUserTableDto) {}
