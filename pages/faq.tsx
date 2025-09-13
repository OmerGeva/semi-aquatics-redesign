import FaqPage from '../components/faq-page/faq-page.component';
import withLayout from '../hocs/withLayout';

// @ts-ignore
const Artist: React.FC = ({questions}) => (
  <FaqPage questions={questions} />
)

export async function getStaticProps(context: { query?: any; store?: any; }) {
    const questions = [
        {
          question: 'Do You Ship Internationally?',
          answer: 'Yes, we ship to almost every country'
        },
        {
          question: 'How Long Does Shipping Take?',
          answer: 'All orders will shipped within 1-2 days!'
        },
        {
          question: 'What’s the Return Policy?',
          answer: 'While we are sure you will be happy with our garments, if for some reason you wish to return a product, we are happy to exchange the item or supply store credit within 30 days after purchase. The order must be sent back in the condition it was received, completely unworn with the original tags.'
        },
        {
          question: 'Are The Garments Unisex?',
          answer: 'Yes! Gendered clothing is an evolutionary failure of humanity. Anyone can wear anything.'
        },
        {
          question: 'How Should I Wash My Semi Aquatic\'s Clothing?',
          answer: 'We recommended washing cold with the garment inside out. Hang dry. Drying machines are an evolutionary failure of humanity. Not only are dryers bad for the environment, but they also reduce the lifespan of your garments.          '
        }
    ]

    return {
        props: {
            questions: questions
        },
        revalidate: 300,
     };
  }

export default withLayout(Artist);
