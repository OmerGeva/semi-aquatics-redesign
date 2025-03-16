import { Dispatch, useMemo, useState } from 'react';
import styles from './PasswordWall.module.scss'
import { useDispatch } from 'react-redux';
import { setPasswordGuessed } from '../../redux/user/user.actions';
import EmailForm from '../email-form/email-form.component';
import Form from '../form/form.component';
import { useNextDrop } from '../../contexts/drop-context';

interface PasswordWallProps {
  images: string[],
  password: string | null,
}

const PasswordWall: React.FC<PasswordWallProps> = ({ images, password }) => {
  const [currentGuess, setCurrentGuess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const { dropData } = useNextDrop();

  const formattedDate = useMemo(() => {
    const date = new Date(dropData?.dateTime || '');
    return date.toDateString();
  }, [dropData]);

  const formattedTime = useMemo(() => {
    const date = new Date(dropData?.dateTime || '');
    return date.toLocaleTimeString();
  }, [dropData]);

  const handlePasswordGuess = (e: any) => {
    if (currentGuess === password) {
      dispatch(setPasswordGuessed(currentGuess));
    } else {
      setErrorMessage('Incorrect password');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  }

  return (
    <div className={styles.PasswordWallContainer}>
      <div className={styles.emailFormContainerPW}>
        <div className={styles.emailFormContainerPWInner}>
          <p>Available {formattedDate} at {formattedTime} EST.</p>
          <p>Join our email list for exclusive discounts and early access codes.</p>
          <EmailForm isSidebar={false} placeholder={'enter email'} />
        </div>
      </div>
      <div className={styles.imageContainer}>
        {
          images.map((image, index) => (
            <img key={index} src={image} alt={`product preview images ${index}`}/>
            ))
          }
      </div>
      <div className={styles.emailFormContainerPW}>
        <div className={styles.emailFormContainerPWInner}>
          <p>Enter password to continue to drop:</p>
          <Form placeholder={'enter password'} handleSubmit={handlePasswordGuess} value={currentGuess} setValue={setCurrentGuess}/>
          <p className={styles.errorMessage}>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordWall;
