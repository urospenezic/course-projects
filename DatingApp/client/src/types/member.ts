export interface Member {
  id: string;
  dateOfBirth: string;
  imageUrl?: string;
  displayName: string;
  created: string;
  lastActive: string;
  gender: string;
  description?: string;
  city: string;
  country: string;
}

export interface EditableMember {
  displayName: string;
  city: string;
  country: string;
  description?: string;
}

export class MemberParams {
  gender?: string;
  minAge = 18;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 10;
  orderBy = 'lastActive';
}
