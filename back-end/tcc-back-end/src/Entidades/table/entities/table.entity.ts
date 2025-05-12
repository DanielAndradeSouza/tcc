import { Transform } from "class-transformer";
import { Scene } from "src/Entidades/scene/entities/scene.entity";
import { UserTable } from "src/Entidades/user_table/entities/user_table.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("table")
export class Table {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    table_name: string;

    @Column({nullable:true})
    description: string;

    @Transform(({ value }) => new Date(value)) 
    @Column('text')
    creation_date: Date;
    @Column({default:true})
    active:boolean;

    @OneToMany(()=> UserTable,(usersTable) => usersTable.table, {onDelete:'CASCADE'})
    usersTable: UserTable;

    @OneToMany(() => Scene, (scene) => scene.table, {onDelete:'CASCADE'})
    scenes: Scene[];

    @OneToOne(() => Scene, { nullable: true })
    @JoinColumn({ name: 'scene_atual_players_id' })
    sceneAtualPlayers: Scene;

    @OneToOne(() => Scene, { nullable: true })
    @JoinColumn({ name: 'scene_atual_gm_id' })
    sceneAtualGM: Scene;
}
