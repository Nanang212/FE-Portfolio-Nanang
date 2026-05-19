import { Link as RouterLink } from 'react-router-dom';

export const Link = ({ href, ...props }) => {
  return <RouterLink to={href} {...props} />;
};
