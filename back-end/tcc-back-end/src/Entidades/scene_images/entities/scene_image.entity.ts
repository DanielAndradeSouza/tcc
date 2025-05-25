import { Scene } from "src/Entidades/scene/entities/scene.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity("scene_images")
export class SceneImage {
      @PrimaryGeneratedColumn()
      id: number;
      
      @ManyToOne(() => Scene, (scene) => scene.sceneImages, { onDelete: 'CASCADE' })
      scene: Scene;
    
      @Column({nullable:false, default:10})
      height: number;
    
      @Column({nullable:false, default:10})
      width: number;
    
      @Column({nullable:false})
      image_url: string;
    
      @Column({default:1})
      x_pos: number;
    
      @Column({default:1})
      y_pos: number;
    
}
