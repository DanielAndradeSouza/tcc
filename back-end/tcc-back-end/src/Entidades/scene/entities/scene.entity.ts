import { SceneImage } from "src/Entidades/scene_images/entities/scene_image.entity";
import { Table } from "src/Entidades/table/entities/table.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("scene")
export class Scene {
      @PrimaryGeneratedColumn()
      id: number;
    
      @ManyToOne(() => Table, (table) => table.scenes, { onDelete: 'CASCADE' })
      table: Table;
    
      @Column({default:'Cena Inicial'})
      title: string;
    
      @Column({default:10})
      width: number;
    
      @Column({default:10})
      height: number;
    
      @OneToMany(() => SceneImage, (sceneImage) => sceneImage.scene, {onDelete:'CASCADE'})
      sceneImages: SceneImage[];
}
