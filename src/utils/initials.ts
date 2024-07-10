export function getInitials(name: string) {
  let initials = '';
  for (const nameSection of name.split(' ')) {
    const initial = nameSection[0];
    if (initial === undefined) {
      break;
    }

    initials += initial.toUpperCase();
  }

  return initials;
}
