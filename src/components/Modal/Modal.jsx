import css from './Modal.module.css';
import { useEffect } from 'react';

const body = document.querySelector('body');

export const Modal = ({ url, addBigImg }) => {
  console.log(url);
  const clickEsc = event => {
    if (event.code === 'Escape') {
      addBigImg('');
    }
  };

  useEffect(() => {
    body.addEventListener('keydown', clickEsc);

    body.style.position = 'fixed';
    body.style.top = '0';
    body.style.bottom = '0';
    body.style.left = '0';
    body.style.right = '0';

    return () => {
      body.removeEventListener('keydown', clickEsc);
      body.style.position = 'static';
    };
  });

  return (
    <div className={css.Modal__backdrop} onClick={() => addBigImg('')}>
      <img src={url} alt="" width="600px" onClick={e => e.stopPropagation()} />
    </div>
  );
};
