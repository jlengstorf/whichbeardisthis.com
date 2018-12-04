import React, { useState } from 'react';
import * as faceapi from 'face-api.js';
import { setConfig } from 'react-hot-loader';
import Layout from '../components/layout';
import Dropzone from '../components/dropzone';
import WhoIsIt from '../components/whoisit';
import Error from '../components/error';
import Loading from '../components/loading';
import Reset from '../components/reset';
import Examples from '../components/examples';
import About from '../components/about';

// This enables React Hooks (see https://github.com/gatsbyjs/gatsby/issues/9489)
setConfig({ pureSFC: true });

const FACIAL_MATCH_THRESHOLD = 0.6;

const getDistance = (reference, upload) =>
  faceapi.round(
    faceapi.euclideanDistance(reference.descriptor, upload.descriptor)
  );

const useFaceApi = () => {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState({ isJason: false, isKyle: false });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  if (typeof window === 'undefined') {
    // Bail during SSR; nothing to do on the server side!
    return [{ loading, error, matches, file }, { reset, checkFace, setError }];
  }

  if (loading) {
    // We have to load these models before we can do anything else.
    Promise.all([
      faceapi.loadSsdMobilenetv1Model('./face_model'),
      faceapi.loadFaceLandmarkModel('./face_model'),
      faceapi.loadFaceRecognitionModel('./face_model'),
    ]).then(() => {
      setLoading(false);
    });
  }

  const reset = () => {
    setLoading(false);
    setMatches({ isJason: false, isKyle: false });
    setFile(null);
    setError(false);
  };

  const checkFace = async file => {
    setLoading(true);

    if (!file) {
      setError('There was a problem with the upload. Please try again.');
      setLoading(false);
      return;
    }

    // Load our two reference images and the uploaded file.
    const images = await Promise.all(
      ['./jason-lengstorf.jpg', './kyle-shevlin.jpg', file].map(imgPath =>
        faceapi.fetchImage(imgPath)
      )
    );

    // Find the faces in the uploaded images.
    const [[jason], [kyle], faces] = await Promise.all(
      images.map(img => faceapi.allFacesSsdMobilenetv1(img))
    );

    if (!faces[0] || !faces[0].descriptor) {
      setError('We couldn’t find a face in this image.');
      setFile(file);
      return;
    }

    const match = faces.find(face => {
      if (!face.descriptor) {
        return false;
      }

      const isJason = getDistance(jason, face) < FACIAL_MATCH_THRESHOLD;
      const isKyle = getDistance(kyle, face) < FACIAL_MATCH_THRESHOLD;

      if (isJason || isKyle) {
        setError(false);
        setLoading(false);
        setMatches({ isJason, isKyle });
        setFile(file);

        // Return true to stop the loop
        return true;
      }

      // Keep looping.
      return false;
    });

    if (!match) {
      setLoading(false);
      setMatches({ isJason: false, isKyle: false });
      setFile(file);
    }
  };

  return [{ loading, error, matches, file }, { reset, checkFace, setError }];
};

export default () => {
  const [
    { loading, error, matches, file },
    { reset, checkFace, setError },
  ] = useFaceApi();

  return (
    <Layout>
      {!file && (
        <>
          <p>
            Is there a bald, bearded man in front of you? Is he talking at
            length about code? Not sure if it’s{' '}
            <a href="https://twitter.com/kyleshevlin">Kyle Shevlin</a> or{' '}
            <a href="https://twitter.com/jlengstorf">Jason Lengstorf</a>?
          </p>
          <p>
            <strong>We can help!</strong> Upload an image of this bearded
            stranger and we’ll tell you which nerd you’re dealing with.
          </p>
        </>
      )}
      <Error error={error} />
      {!file && (
        <>
          {loading ? (
            <Loading />
          ) : (
            <Dropzone handleDrop={checkFace} handleError={setError} />
          )}
          <Examples handleClick={checkFace} loading={loading} />
        </>
      )}
      {file && (
        <>
          {!error && <WhoIsIt {...matches} file={file} />}
          <Reset reset={reset} />
        </>
      )}
      <About />
    </Layout>
  );
};
