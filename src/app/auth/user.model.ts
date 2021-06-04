export class User {
  constructor(public email: string, public id: string, private token: string, private tokenExpirationDate: Date) {}
}

// get token() {
//   if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
//     return null as any;
//   }
//   return this.token;
// }

