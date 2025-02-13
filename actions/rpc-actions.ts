'use server'

export async function getRpcEndpoint() {
  return process.env.PRIVATE_SOLANA_RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com';
}