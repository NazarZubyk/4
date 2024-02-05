import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    height: number;

    @Column()
    mass: number;

    @Column()
    hair_color: string;

    @Column()
    skin_color: string;

    @Column()
    eye_color: string;

    @Column()
    birth_year: string;

    @Column()
    gender: string;

    @Column()
    homeworld: string;

    @Column('simple-array')
    films: string[];

    @Column('simple-array')
    species: string[];

    @Column('simple-array')
    vehicles: string[];

    @Column('simple-array')
    starships: string[];

    @Column()
    created: string;

    @Column()
    edited: string;

    @Column()
    url: string;

    constructor(
        id: number,
        name: string,
        height: number,
        mass: number,
        hair_color: string,
        skin_color: string,
        eye_color: string,
        birth_year: string,
        gender: string,
        homeworld: string,
        films: string[],
        species: string[],
        vehicles: string[],
        starships: string[],
        created: string,
        edited: string,
        url: string
    ) {
        this.id = id;
        this.name = name;
        this.height = height;
        this.mass = mass;
        this.hair_color = hair_color;
        this.skin_color = skin_color;
        this.eye_color = eye_color;
        this.birth_year = birth_year;
        this.gender = gender;
        this.homeworld = homeworld;
        this.films = films;
        this.species = species;
        this.vehicles = vehicles;
        this.starships = starships;
        this.created = created;
        this.edited = edited;
        this.url = url;
    }
}
