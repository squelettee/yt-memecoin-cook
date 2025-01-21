import { getTemplateByDomain } from "@/actions/templates-actions";
import Image from "next/image";
import { redirect } from 'next/navigation';

interface SubdomainPageProps {
  params: Promise<{
    subdomain: string
  }>
}

export default async function SubdomainPage({ params }: SubdomainPageProps) {
  const { subdomain } = await params;
  const { template, error } = await getTemplateByDomain(subdomain);

  if (error || !template) {
    redirect(process.env.NEXT_PUBLIC_API_URL!);
    return null;
  }

  return (
    <div>
      <h1>Project: {template.projectName}</h1>
      {template.description && <p>{template.description}</p>}
      {template.logo && <Image src={`/${template.logo}`} alt="Logo" width={10} height={10} />}
      {template.background && <Image src={`/${template.background}`} alt="Background" width={10} height={10} />}
      {template.imagePreview && <Image src={`/${template.imagePreview}`} alt="Preview" width={10} height={10} />}

      <h2>Token Information</h2>
      {template.ticker && <p>Ticker: {template.ticker}</p>}
      {template.contractAddress && <p>Contract: {template.contractAddress}</p>}

      <h2>Links</h2>
      {template.telegram && <p>Telegram: {template.telegram}</p>}
      {template.twitter && <p>Twitter: {template.twitter}</p>}
      {template.instagram && <p>Instagram: {template.instagram}</p>}
      {template.tiktok && <p>TikTok: {template.tiktok}</p>}
      {template.whitepaper && <p>Whitepaper: {template.whitepaper}</p>}

      <h2>Markets</h2>
      {template.jupiter && <p>Available on Jupiter</p>}
      {template.birdeye && <p>Birdeye: {template.birdeye}</p>}
      {template.coinGecko && <p>CoinGecko: {template.coinGecko}</p>}
      {template.coinMarketCap && <p>CoinMarketCap: {template.coinMarketCap}</p>}
      {template.dexscreener && <p>DexScreener: {template.dexscreener}</p>}
      {template.dextools && <p>DexTools: {template.dextools}</p>}
      {template.pumpFun && <p>PumpFun: {template.pumpFun}</p>}
    </div>
  );
}