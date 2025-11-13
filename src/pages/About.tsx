import React from 'react';
import PageLayout from '../components/layout/PageLayout';

const About: React.FC = () => {
  return (
    <PageLayout>
      <div className="bg-gradient-to-b from-vedic-red to-vedic-blue text-vedic-cream min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center">About Rigveda.app</h1>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">About Rigveda.app</h2>
          <p className="text-lg leading-relaxed mb-4">
            Rigveda.app is a non-profit initiative dedicated to preserving and promoting the ancient wisdom of the Rigveda. Our mission is to make this profound text accessible to a global audience through a user-friendly digital platform.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            We believe in the power of open knowledge and strive to provide a comprehensive resource for scholars, students, and spiritual seekers alike. Our platform offers various translations, recitations, and analytical tools to enhance the study and understanding of the Rigveda.
          </p>
          <p className="text-lg leading-relaxed">
            This project is built with a passion for cultural heritage and a commitment to academic rigor. We continuously work to improve the platform and welcome contributions from the community.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Sources & Attribution</h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              The content presented on Rigveda.app is meticulously compiled from various scholarly sources to ensure accuracy and authenticity. We are deeply grateful to the researchers, translators, and institutions whose work forms the foundation of this platform.
            </p>
            <p>
              <b>Textual Data:</b> The primary Sanskrit text of the Rigveda is based on critically acclaimed editions, cross-referenced with multiple manuscripts to ensure fidelity. Any discrepancies or variations are noted where appropriate.
            </p>
            <div>
              <p className="mb-2"><b>Translations:</b></p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>
                  <b>Ralph T.H. Griffith:</b> The English translation by Ralph T.H. Griffith (1896) is provided for its historical significance and widespread recognition. It offers a poetic rendition of the hymns.
                </li>
                <li>
                  <b>Jamison and Brereton:</b> The translation by Stephanie W. Jamison and Joel P. Brereton (2014) is included for its contemporary scholarly approach and detailed philological insights.
                </li>
                <li>
                  <b>H.H. Wilson:</b> The translation by H.H. Wilson is also incorporated, offering another classical interpretation from the 19th century.
                </li>
              </ul>
            </div>
            <p>
              <b>Metadata and Indexing:</b> Information regarding mandalas, hymns, suktas, and associated deities/rishis is derived from traditional indices and modern academic databases, ensuring precise categorization and search functionality.
            </p>
            <p>
              <b>Audio Recitations:</b> Audio recordings of the Rigvedic hymns are sourced from dedicated chanters and Vedic scholars, aiming to provide authentic pronunciation and intonation. These are offered to enhance the meditative and learning experience.
            </p>
            <p>
              <b>Iconography and Design:</b> Visual elements, including icons and design motifs, are inspired by ancient Indian art and spiritual symbolism, carefully chosen to reflect the reverence and depth of the Rigvedic tradition.
            </p>
            <p className="italic mt-6">
              Disclaimer: Rigveda.app is intended for educational and spiritual exploration. While we strive for accuracy, users are encouraged to consult original texts and diverse scholarly interpretations for a comprehensive understanding.
            </p>
          </div>
        </section>
      </div>
    </div>
    </PageLayout>
  );
};

export default About;
