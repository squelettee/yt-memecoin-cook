interface CreateTemplatePageProps {
  params: Promise<{
    subdomain: string
  }>
}

export default async function CreateTemplatePage({ params }: CreateTemplatePageProps) {
  const { subdomain } = await params;

  return (
    <div>
      <h1>Subdomain: {subdomain}</h1>
    </div>
  )
}