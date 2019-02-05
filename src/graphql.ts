/* tslint:disable */
export class CreateUserInput {
    authId?: string;
    email?: string;
    role?: string;
}

export abstract class IMutation {
    abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract getUser(id: number): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class User {
    id: number;
    authId?: string;
    email?: string;
    role?: string;
}
