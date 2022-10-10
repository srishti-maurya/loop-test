import toast from 'react-hot-toast';

export const toast_loginError = () =>
  toast.error('Invalid credentials! Try Again');
export const toast_loginSuccess = () => toast.success('Login successful');
export const toast_logoutSuccess = () => toast.success('Logged out successful');
export const toast_bookmarkAdded = () => toast.success('Bookmark Added');
export const toast_bookmarkRemoved = () => toast.success('Bookmark Removed');
export const toast_addedToList = () => toast.success('Restaurant Added');
export const toast_removedFromList = () => toast.success('Restaurant Removed');
export const toast_addedToLike = () => toast.success('Restaurant Liked');
export const toast_removedFromLike = () => toast.success('Restaurant Unliked');
export const toast_alreadyInList = () => toast.error('Already in List');
