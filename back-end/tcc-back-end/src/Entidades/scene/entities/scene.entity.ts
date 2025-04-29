import { SceneImage } from "src/Entidades/scene_images/entities/scene_image.entity";
import { Table } from "src/Entidades/table/entities/table.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("scene")
export class Scene {
      @PrimaryGeneratedColumn()
      id: number;
    
      @ManyToOne(() => Table, (table) => table.scenes, { onDelete: 'CASCADE' })
      table: Table;
    
      @Column()
      title: string;
    
      @Column()
      width: number;
    
      @Column()
      height: number;
    
      @Column({ type: 'json', nullable: true })
      tokens: any; // Pode ser um objeto JSON para armazenar os tokens do cenário
    
      @OneToMany(() => SceneImage, (sceneImage) => sceneImage.scene)
      sceneImages: SceneImage[];
}
