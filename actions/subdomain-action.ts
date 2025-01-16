/**
 * Actions to handle subdomain-related API calls
 */
export const subdomainAction = {
  /**
   * Check if a subdomain is available
   * @param subdomain - The subdomain to check
   * @returns Promise<{ error?: string, subdomain?: string }>
   */
  async checkAvailability(subdomain: string) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/subdomains/check?subdomain=${subdomain}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Une erreur est survenue' };
      }

      return { subdomain: data.subdomain };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { error: 'Erreur de connexion au serveur' };
    }
  },
}; 