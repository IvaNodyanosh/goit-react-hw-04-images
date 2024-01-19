import css from './Modal.module.css';
import { useEffect } from 'react';

const body = document.querySelector('body');

export const Modal = ({ url, addBigImg }) => {
  const clickEsc = event => {
    if (event.code === 'Escape') {
      addBigImg('');
    }
  };

  useEffect(() => {
    body.addEventListener('keydown', clickEsc);
    return () => {
      body.removeEventListener('keydown', clickEsc);
    };
  });

  return (
    <div className={css.Modal__backdrop} onClick={() => addBigImg('')}>
      <img src={url} alt="" width="600px" />
    </div>
  );
};
