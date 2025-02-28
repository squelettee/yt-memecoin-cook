import { QuoteResponse, SwapParams, SwapResponse } from '@/interfaces/jupiter';

export class JupiterService {
  private static API_URL = 'https://api.jup.ag/swap/v1/swap';

  /**
   * Obtient un devis pour un swap
   */
  static async getQuote(
    inputAmount: number,
    outputMint: string,
    slippageBps: number = 50
  ): Promise<QuoteResponse> {
    try {
      // Token SOL
      const inputMint = 'So11111111111111111111111111111111111111112';

      const params = new URLSearchParams({
        inputMint,
        outputMint,
        amount: (inputAmount * 1e9).toString(), // Conversion en lamports
        slippageBps: slippageBps.toString(),
      });

      const response = await fetch(`${this.API_URL}/quote?${params}`);

      if (!response.ok) {
        throw new Error(`Erreur API Jupiter: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération du devis:', error);
      throw error;
    }
  }

  /**
   * Crée une transaction de swap
   */
  static async createSwap(params: SwapParams): Promise<SwapResponse> {
    try {
      const response = await fetch(`${this.API_URL}/swap`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error(`Erreur API Jupiter: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la création de la transaction:', error);
      throw error;
    }
  }
} 