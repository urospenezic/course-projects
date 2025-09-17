// type User = {//any object that can be fit into the User type can be used here, so unlike C#, types are not enforced in typescript (e.g. single type per object, object can be of different types in different parts of the code)
//   id: string;
//   avatar: string;
//   name: string;
// };

export interface User {//difference between type and interface is that type is a compile time construct and interface is a runtime construct. with interfaces, we can really only define objects, not other types.
    id: string;
    avatar: string;
    name: string;
  }