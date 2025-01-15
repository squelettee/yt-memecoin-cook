interface SubdomainPageProps {
  params: Promise<{
    subdomain: string
  }>
}

export default async function SubdomainPage({ params }: SubdomainPageProps) {
  const { subdomain } = await params;

  return (
    <div>
      <h1>Subdomain: {subdomain}</h1>
    </div>
  )
}