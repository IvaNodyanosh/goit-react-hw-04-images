import css from './App.module.css';
import { useReducer, useEffect } from 'react';
import { Loader } from './Loader/Loader';

import { getImages } from './getImages';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/imageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

const reducer = (prevState, action) => {
  if (action.type === 'addImg') {
    if (prevState.searchParameters !== action.searchParameters) {
      return {
        ...prevState,
        images: [...action.data.hits],
        totalImages: action.data.totalHits,
        requestStatus: 'ok',
      };
    } else {
      return {
        ...prevState,
        images: [...prevState.images, ...action.data.hits],
        totalImages: action.data.totalHits,
        requestStatus: 'ok',
      };
    }
  } else if (action.type === 'error') {
    return {
      ...prevState,
      error: action.error,
    };
  } else if (action.type === 'submit') {
    return {
      ...prevState,
      searchParameters: action.parameters,
      images: [],
      page: 1,
      error: '',
    };
  } else if (action.type === 'decrement') {
    return { ...prevState, page: prevState.page + 1 };
  } else if (action.type === 'addBigImg') {
    return {
      ...prevState,
      bigImgUrl: action.bigImgUrl,
    };
  } else if (action.type === 'loading') {
    return {
      ...prevState,
      requestStatus: 'loading'
    }
  }
};

export const App = () => {
  const [galleryParameters, changeGalleryParameters] = useReducer(reducer, {
    searchParameters: '',
    images: [],
    totalImages: '',
    page: 1,
    requestStatus: '',
    error: '',
    bigImgUrl: '',
  });

  const { searchParameters, page } = galleryParameters;

  useEffect(() => {
    if (searchParameters) {
      changeGalleryParameters({ type: 'loading' });
      getImages(searchParameters, page)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.status);
          }
        })
        .then(data => {
          console.log(data);

          changeGalleryParameters({
            type: 'addImg',
            data,
            searchParameters: searchParameters,
          });
        })
        .catch(error => {
          changeGalleryParameters({ error, type: 'error' });
        });
    }
  }, [searchParameters, page]);

  const submitForm = parameters => {
    changeGalleryParameters({ parameters, type: 'submit' });
  };

  const addBigImg = bigImgUrl => {
    changeGalleryParameters({ bigImgUrl, type: 'addBigImg' });
  };

  return (
    <div className={css.App}>
      <Searchbar submitForm={submitForm} />

      <ImageGallery addBigImg={addBigImg} images={galleryParameters.images} />

      {galleryParameters.requestStatus === 'loading' && <Loader />}

      {galleryParameters.requestStatus === 'ok' &&
        Number(galleryParameters.totalImages) / 12 >=
          galleryParameters.page && (
          <Button
            decrementPage={() => changeGalleryParameters({ type: 'decrement' })}
          />
        )}

      {galleryParameters.bigImgUrl !== '' && (
        <Modal url={galleryParameters.bigImgUrl} addBigImg={addBigImg} />
      )}
    </div>
  );
};
