import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = 'Davet Digital - Mükemmel Düğün Sitenizi Dakikalar İçinde Oluşturun',
  description = 'QR kodlu fotoğraf paylaşımı, canlı ekran gösterileri, RSVP yönetimi ve 10 premium tema ile muhteşem düğün sitenizi oluşturun. Kod yazmaya gerek yok. 30 günlük ücretsiz deneme.',
  keywords = 'düğün sitesi, düğün davetiyesi, online davetiye, QR kod düğün, düğün fotoğraf paylaşımı, RSVP, düğün organizasyon, davet.digital',
  ogImage = 'https://davet.digital/og-image.jpg',
  url = 'https://davet.digital/',
  type = 'website'
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  )
}

export default SEO
