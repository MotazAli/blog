import { PartialType } from '@nestjs/mapped-types';
import { CreateThumbDto } from './create-thumb.dto';

export class UpdateThumbDto extends PartialType(CreateThumbDto) {}