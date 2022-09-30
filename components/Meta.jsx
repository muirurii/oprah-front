import Head from 'next/head';

const Meta = ({description,keywords,title}) => {
  return (
    <Head>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet"/>
        <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
    description:"blog",
    keywords:"blog",
    title:"blogue"
}

export default Meta;