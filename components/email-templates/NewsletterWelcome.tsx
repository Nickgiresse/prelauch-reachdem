
import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
} from '@react-email/components';

const NewsletterWelcome = (props: { name?: string; unsubscribeLink: string }) => {
  const displayName = props.name || "Link by Reachdem";
  
  return (
    <Html lang="fr" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Bienvenue dans notre newsletter, {displayName} !</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white max-w-[600px] mx-auto rounded-[8px]">
            {/* Header */}
            <Section className="bg-orange-300 text-center py-[32px] px-[24px] rounded-t-[8px]">
              <Heading className="text-black text-[28px] font-bold m-0">
                Links By ReachDem
              </Heading>
            </Section>

            {/* Main Content */}
            <Section className="px-[32px] py-[32px]">
              <Heading className="text-black text-[24px] font-bold mb-[20px]">
                Bienvenue {displayName} !
              </Heading>
              
              <Text className="text-gray-700 text-[16px] leading-[24px] mb-[20px]">
                Merci de vous être inscrit à notre newsletter. Vous allez recevoir régulièrement 
                nos dernières actualités et contenus exclusifs directement dans votre boîte mail.
              </Text>

              <Text className="text-gray-700 text-[16px] leading-[24px] mb-[20px]">
                Nous sommes ravis de vous compter parmi nos abonnés et nous espérons que nos 
                contenus vous apporteront de la valeur.
              </Text>

              <Text className="text-gray-700 text-[16px] leading-[24px] mb-[24px]">
                À très bientôt !
              </Text>

              <Text className="text-gray-800 text-[16px] font-semibold m-0">
                {"L'équipe Links By ReachDem"}
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[20px]" />

            {/* Footer */}
            <Section className="px-[32px] pb-[32px]">
              <Text className="text-gray-500 text-[12px] leading-[16px] text-center mb-[12px] m-0">
                <strong>ReachDem</strong><br />
                PK13, Eva Hotel<br />
                © 2025 ReachDem. Tous droits réservés.
              </Text>

              <Text className="text-gray-500 text-[12px] leading-[16px] text-center m-0">
                <Link 
                  href={props.unsubscribeLink} 
                  className="text-orange-400 underline hover:text-orange-600"
                >
                  Se désabonner
                </Link>
                {" • "}
                <Link 
                  href="mailto:contact@reachdem.com" 
                  className="text-orange-400 underline hover:text-orange-600"
                >
                  Nous contacter
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

NewsletterWelcome.PreviewProps = {
  name: "{{name}}",
  unsubscribeLink: "{{unsubscribeLink}}",
};

export default NewsletterWelcome;