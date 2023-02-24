/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { Container } from './styles';

export default function ToggleThemeButton({ theme, onToggleTheme }) {
  return (
    <Container>
      <input type="checkbox" className="checkbox" id="checkbox" onClick={onToggleTheme} />
      <label htmlFor="checkbox">
        <div className="toggle-ball">
          {theme === 'dark' ? <BsFillSunFill /> : <BsFillMoonFill />}
        </div>
      </label>
    </Container>
  );
}

ToggleThemeButton.propTypes = {
  theme: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};
