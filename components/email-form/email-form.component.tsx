import React from 'react';
import styles from  './EmailForm.module.scss';

// Packages
import axios from 'axios';
import { EmailFormProps } from '../../interfaces/page_interface';
import Form from '../form/form.component';

const EmailForm: React.FC<EmailFormProps> = ({ isSidebar, placeholder }) => {
  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const handleSuccessResponse = (response: any) => {
    setEmail('');
    setErrorMessage('');
    setSuccessMessage('Thank you for subscribing!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  }

  const handleErrorResponse = (error: any) => {
    setSuccessMessage('');
    setErrorMessage(error.message);
    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setSuccessMessage('');
      setErrorMessage('Please enter a valid email address.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    const apiUrl = `https://proxy-semi-aquatics.onrender.com/api/subscribe/${email}`;
    try {
      const response = await axios.post(apiUrl, {})
      await handleSuccessResponse(response);
    } catch (error) {
      await handleErrorResponse(error);
    }
  }

  return (
    <React.Fragment>
      {
        isSidebar ?
      <div className={styles.sidebarEmailFormContainer}>
        <form className={styles.emailForm}>
          <input type="text" placeholder={placeholder ?? 'enter your email'} id={styles.emailInput} value={email} onChange={(e) => setEmail(e.target.value)} />
          <p className={styles.submitButtonText} onClick={handleSubmit}>Subscribe</p>
        </form>
      </div>
    :
      <div className={styles.emailFormContainer}>
        <Form handleSubmit={handleSubmit} placeholder={placeholder} value={email} setValue={setEmail} />
      </div>
    }
    <div className={styles.messageContainer}>
      {
        errorMessage.length > 0 &&
          <p className={styles.errorMessage}>{errorMessage}</p>
      }
      {
        successMessage.length > 0 &&
          <p className={styles.successMessage}>{successMessage}</p>
      }
    </div>
    </React.Fragment>
  );
}

export default EmailForm;
