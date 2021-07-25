import { default as NextHead } from "next/head";

interface HeadProps {
  title: string;
  content: string;
}

const Head: React.FC<HeadProps> = ({ title, content }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta property="og:title" content={content} key="title" />
    </NextHead>
  );
};

export default Head;
