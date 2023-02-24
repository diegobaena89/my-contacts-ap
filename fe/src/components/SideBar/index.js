import { AiOutlineCloseCircle, AiOutlineContacts } from 'react-icons/ai';
import { BiCategoryAlt } from 'react-icons/bi';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ReactPortal from '../ReactPortal';
import { Container, Overlay } from './styles';

export default function SideBar({ onShowSideBar }) {
  return (
    <ReactPortal containerId="sidebar-root">
      <Overlay>
        <Container>
          <header>
            <AiOutlineCloseCircle size={32} onClick={onShowSideBar} />
          </header>
          <nav>
            <Link to="/">
              <AiOutlineContacts />
              <span>Contatos</span>
            </Link>
            <Link to="/categories">
              <BiCategoryAlt />
              <span>Categorias</span>
            </Link>
          </nav>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

SideBar.propTypes = {
  onShowSideBar: PropTypes.func.isRequired,
};
