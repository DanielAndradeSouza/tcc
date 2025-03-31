import { PartialType } from '@nestjs/mapped-types';
import { CreateSceneImageDto } from './create-scene_image.dto';

export class UpdateSceneImageDto extends PartialType(CreateSceneImageDto) {}
