import { Test, TestingModule } from '@nestjs/testing';
import { UserTableController } from './user_table.controller';
import { UserTableService } from './user_table.service';

describe('UserTableController', () => {
  let controller: UserTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTableController],
      providers: [UserTableService],
    }).compile();

    controller = module.get<UserTableController>(UserTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
