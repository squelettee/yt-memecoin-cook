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
      const response = await fetch(`/api/templates/get?domain=${domain}`, {
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

  async getLatestTemplates() {
    try {
      const response = await fetch(`/api/templates/latest`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Une erreur est survenue' };
      }

      return { templates: data.templates };
    } catch (error) {
      return { error: error };
    }
  }
};