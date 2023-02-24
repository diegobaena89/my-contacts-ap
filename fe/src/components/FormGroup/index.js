import PropTypes from 'prop-types';
import Spinner from '../Spinner';

import { Container } from './styles';

export default function FormGroup({ children, error, isLoading }) {
  return (
    <Container>
      {children}

      {isLoading && <div className="loader"><Spinner size={16} /></div>}

      {error && <small>{error}</small>}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
};

FormGroup.defaultProps = {
  error: '',
  isLoading: false,
};
