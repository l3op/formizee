import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text
} from '@react-email/components';
import config from '../tailwind.config';

interface EmailProps {
  email: string;
  link: string;
}

export const AuthVerifyLinkedEmail = ({email, link}: EmailProps) => (
  <Tailwind config={config}>
    <Html lang="en">
      <Head />
      <Preview>Verify {email} as your new linked email for Formizee</Preview>
      <Body
        style={{fontFamily: 'Inter, System-UI, sans-serif'}}
        className="bg-neutral-50 flex justify-center"
      >
        <Container className="max-w-[560px] m-2">
          <Img
            src="https://avatars.githubusercontent.com/u/168822716?s=200&v=4"
            alt="Formizee."
            className="rounded-xl mt-4 w-14 h-14"
          />
          <Heading className="text-[22px] pt-4 pb-2 font-medium text-neutral-800">
            Verify your new linked email
          </Heading>
          <Text className="text-neutral-600 leading-[1.4] text-[15px]">
            We noticed you're adding{' '}
            <Link href={`mailto:${email}`} className="text-amber-500">
              {email}
            </Link>{' '}
            to your Formizee account. To finish setting this up, click the
            button below.
          </Text>
          <Button
            className="flex w-32 px-3 border-neutral-300 py-2 justify-center items-center rounded-md my-8 text-neutral-700"
            style={{border: '1px solid #d4d4d4'}}
            href={link}
          >
            <div className="flex gap-2">
              <span className="font-medium text-sm">Verify Email</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="18"
                height="18"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </Button>
          <Text className="text-neutral-600 leading-[1.4] text-[15px]">
            This link will expire in one hour. If you don't verify your email
            within that time, just request a new link when you're ready.
          </Text>
          <Hr className="text-neutral-300 my-5 mx-1" />
          <Container className="flex flex-row justify-between items-center">
            <Link
              href="https://formizee.com"
              className="text-sm text-neutral-400"
            >
              © {new Date().getFullYear()} Formizee. All Rights Reserved.
            </Link>
          </Container>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

AuthVerifyLinkedEmail.PreviewProps = {
  email: 'example@formizee.com',
  link: 'https://dashboard.formizee.com/auth/linked-emails/verify?token=123456'
} as EmailProps;

export default AuthVerifyLinkedEmail;
