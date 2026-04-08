export const pureChange = (
  sort: string,
  down: string,
  up: string
) => {
  return sort === down ? up : sort === up ? '' : down;
};