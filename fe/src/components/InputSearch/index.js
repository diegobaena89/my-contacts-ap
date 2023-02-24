import PropTypes from 'prop-types';
import { Container } from './styles';

export default function InputSearch({ searchTerm, handleChangeSearch }) {
  return (
    <Container>
      <input
        value={searchTerm}
        type="text"
        placeholder="Pesquise pelo nome..."
        onChange={handleChangeSearch}
      />
    </Container>
  );
}

InputSearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleChangeSearch: PropTypes.func.isRequired,
};
