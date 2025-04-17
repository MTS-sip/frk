export default interface IUserContext { 
  user: {
    username: string | null;
    _id: string | null;
  } | null;
}
