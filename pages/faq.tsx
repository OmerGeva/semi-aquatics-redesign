import FaqPage from '../components/faq-page/faq-page.component';
import withLayout from '../hocs/withLayout';

// @ts-ignore
const Artist: React.FC = ({ sections }) => (
  <FaqPage sections={sections} />
);

export async function getStaticProps() {
  const sections = [
    {
      title: 'Shipping',
      items: [
        {
          question: 'Do You Ship Internationally?',
          answer: 'Yes, we ship to most countries worldwide.'
        },
        {
          question: 'How Long Does Shipping Take?',
          answer: 'Orders typically ship within 1–2 business days. Transit time varies by destination.'
        }
      ]
    },
    {
      title: 'Orders & Returns',
      items: [
        {
          question: 'What’s the Return Policy?',
          answer:
            'We accept exchanges or store credit within 30 days of purchase. Items must be unworn, in original condition, with tags attached.'
        }
      ]
    },
    {
      title: 'Product',
      items: [
        {
          question: 'Are The Garments Unisex?',
          answer: 'Yes. Wear what you like.'
        },
        {
          question: "How Should I Wash My Semi Aquatic's Clothing?",
          answer:
            'Wash cold, inside out. Hang dry. Avoid dryers to extend garment life and reduce environmental impact.'
        }
      ]
    }
  ];

  return {
    props: { sections },
    revalidate: 300
  };
}

export default withLayout(Artist);
