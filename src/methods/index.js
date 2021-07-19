export function getInitials(user) {
  return user?.firstName?.slice(0, 1) + user?.surname?.slice(0, 1);
}
