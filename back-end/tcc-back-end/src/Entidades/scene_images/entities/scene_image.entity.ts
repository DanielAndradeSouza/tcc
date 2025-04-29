import { Scene } from "src/Entidades/scene/entities/scene.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity("scene_images")
export class SceneImage {
      @PrimaryGeneratedColumn()
      id: number;
    
      @ManyToOne(() => Scene, (scene) => scene.sceneImages, { onDelete: 'CASCADE' })
      scene: Scene;
    
      @Column()
      height: number;
    
      @Column()
      width: number;
    
      @Column()
      image_url: string;
    
      @Column()
      x_pos: number;
    
      @Column()
      y_pos: number;
    
      @Column()
      rotation: number;
    
      @Column()
      layer: string;
}
