import Head from 'next/head';

const Meta = ({description,keywords,title}) => {
  return (
    <Head>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
    description:"blog",
    keywords:"blog",
    title:"Orpah"
}

export default Meta;