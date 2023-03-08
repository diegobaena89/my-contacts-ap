/* eslint-disable quotes */
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Overlay, Container, Footer } from "./styles";

import Button from "../Button";
import ReactPortal from "../ReactPortal";

export default function Modal({
  danger,
  visible,
  title,
  isLoading,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  const [shouldRender, setShouldRender] = useState(visible);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }

    const overlayRefElement = overlayRef.current;
    if (!visible && overlayRef.current) {
      overlayRefElement.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      if (overlayRefElement) {
        overlayRefElement.removeEventListener(
          "animationend",
          handleAnimationEnd,
        );
      }
    };
  }, [visible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={overlayRef}>
        <Container danger={danger} isLeaving={!visible}>
          <strong>{title}</strong>

          <div className="modal-body">{children}</div>

          <Footer isLoading={isLoading}>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: "Cancelar",
  confirmLabel: "Confirmar",
};
