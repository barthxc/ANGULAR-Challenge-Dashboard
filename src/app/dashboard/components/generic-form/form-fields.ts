import {
  CommentResponse,
  PostResponse,
  UserResponse,
} from '../../interfaces/interfaces';

const extractFields = <T extends object>(
  UserResponse: UserResponse
): string[] => {
  return Object.keys({} as T).filter((key) => key !== 'id');
};

// export const FORM_FIELDS = {
//   user: extractFields<UserResponse>(), // Extrae los campos de UserResponse sin el 'id'
//   post: extractFields<PostResponse>(), // Extrae los campos de PostResponse sin el 'id'
//   comment: extractFields<CommentResponse>(), // Extrae los campos de CommentResponse sin el 'id'
// } as const;
