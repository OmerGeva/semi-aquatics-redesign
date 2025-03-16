import styles from './Button.module.scss';

interface ButtonProps {
  soldOut: boolean;
  isSelected: boolean;
  children: any;
  selected: any;
  mobile: boolean;
  onClick: (selected: any) => Promise<void>;
  color?: 'white' | 'black'; // New prop for color
  additionalText?: React.ReactNode; // New prop for additional content on the right
  flexDisplay?: boolean; // New prop to enable flex layout
}

const Button: React.FC<ButtonProps> = ({
  children,
  soldOut,
  isSelected,
  onClick,
  selected,
  mobile,
  color = 'black', // Default to black
  additionalText,
}) => (
  mobile ? (
    <div
      className={`${styles.mobileButtonContainer} ${
        soldOut || !isSelected ? styles.mobileSoldOutButton : ''
      } ${styles[color]} ${additionalText ? styles.flex : ''}`}
      onClick={() => !soldOut && isSelected && onClick(selected)}
    >
      <p>{children}</p>
      {additionalText && additionalText && <span>{additionalText}</span>}
    </div>
  ) : (
    <div
      className={`${styles.buttonContainer} ${
        soldOut || !isSelected ? styles.soldOut : ''
      } ${styles[color]} ${additionalText ? styles.flex : ''}`}
      onClick={() => !soldOut && isSelected && onClick(selected)}
    >
      <p>{children}</p>
      {additionalText && additionalText && <span>{additionalText}</span>}
    </div>
  )
);

export default Button;