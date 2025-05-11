import { Exclude, Transform } from "class-transformer";
import { UserTable } from "src/Entidades/user_table/entities/user_table.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email:string;
    
    @Exclude()
    @Column()
    password:string;
    
    @Column()
    name:string;
    @Transform(({ value }) => new Date(value)) 
    @Column('text')
    creation_date: Date;

    @Column({default:true})
    active: boolean;

    @Transform(({ value }) => new Date(value)) 
    @Column({ type: 'datetime', nullable: true })
    deactivation_date: Date;
    
    @OneToMany(() => UserTable, (usersTable) => usersTable.user)
    usersTable: UserTable;
}
