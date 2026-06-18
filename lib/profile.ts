/** Alexander Wentzel — fødselsdag 5. maj 2001 */
export const BIRTHDAY = new Date(2001, 4, 5);

export function getAge(referenceDate: Date = new Date()): number {
  let age = referenceDate.getFullYear() - BIRTHDAY.getFullYear();
  const hasHadBirthdayThisYear =
    referenceDate.getMonth() > BIRTHDAY.getMonth() ||
    (referenceDate.getMonth() === BIRTHDAY.getMonth() &&
      referenceDate.getDate() >= BIRTHDAY.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
}
