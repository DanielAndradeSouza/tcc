import { Test, TestingModule } from '@nestjs/testing';
import { SceneImagesController } from './scene_images.controller';
import { SceneImagesService } from './scene_images.service';

describe('SceneImagesController', () => {
  let controller: SceneImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SceneImagesController],
      providers: [SceneImagesService],
    }).compile();

    controller = module.get<SceneImagesController>(SceneImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
