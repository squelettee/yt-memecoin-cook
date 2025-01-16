/**
 * Actions to handle template-related API calls
 */
export const templateActions = {
  /**
   * Get template information by domain
   * @param domain - The domain to fetch template for
   * @returns Promise<{ error?: Error, template?: any }>
   */
  async getTemplateByDomain(domain: string) {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/templates/get?domain=${domain}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Une erreur est survenue' };
      }

      return { template: data.template };
    } catch (error) {
      return { error: error };
    }
  },
};