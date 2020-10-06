import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function SimpleMediaQuery(minWidth) {
  const matches = useMediaQuery(`(min-width: ${minWidth})`);
  return matches;
}