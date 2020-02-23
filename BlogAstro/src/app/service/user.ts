export class User {
    constructor(
        public id: number,
        public prenom: string,
        public nom: string,
        public email: string,
        public password: string,
        public nomBlogeur: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }
}