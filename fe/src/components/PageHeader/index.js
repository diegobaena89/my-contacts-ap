import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import arrow from '../../assets/images/icons/arrow.svg';
import { Container } from './styles';

export default function PageHeader({ title }) {
  const history = useHistory();

  function handleGoBack() {
    history.goBack();
  }

  return (
    <Container>
      <button type="button" onClick={handleGoBack}>
        <img src={arrow} alt="Back" />
        <span>Voltar</span>
      </button>
      <h1>{title}</h1>
    </Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
