import EmailForm from '../email-form/email-form.component';
import styles from './StoryPage.module.scss';

const StoryPage: React.FC = () => (
  <div className={styles.storyPageContainer}>
    <div className={styles.contentBox}>
      <h1 className={styles.storyTitle}>SEMI AQUATICS</h1>

      <div className={styles.textContainer}>
        <p>Semi Aquatics is a sustainable design collective crafting future-proof apparel—pieces built to last a lifetime and made to help you embrace your individuality. We are many minds with one purpose: artists, scientists, technologists, and makers flowing together under one current to reimagine what clothing can do for both people and planet.</p>

        <h2 className={styles.subTitle}>Our Purpose</h2>
        <p>To spark personal <strong>evolution</strong> and accelerate an Earth-positive future by <strong>evolving</strong> every drop beyond the last—refining materials, processes, and artistry so each garment leaves you, and the world, better than before.</p>

        <p>Every release is a living experiment: smarter fabrics, cleaner construction, bolder design. We challenge ourselves—and the industry—to keep moving forward, to keep <strong>evolving</strong>.</p>

        <p>Together, we’re rewriting the tide: one original design, one conscious choice, one ripple at a time.</p>
      </div>

      <h2 className={styles.storyTitle}>To join our cause, sign up with your email to get notified when our next collection become available:</h2>
      <div className={styles.emailFormContainer}>
        <EmailForm isSidebar={false} />
      </div>
    </div>
  </div>
);

export default StoryPage;
