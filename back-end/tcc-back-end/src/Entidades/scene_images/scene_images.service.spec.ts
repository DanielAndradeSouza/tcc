import { Test, TestingModule } from '@nestjs/testing';
import { SceneImagesService } from './scene_images.service';

describe('SceneImagesService', () => {
  let service: SceneImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SceneImagesService],
    }).compile();

    service = module.get<SceneImagesService>(SceneImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
