import { TemplateFormData } from "@/schemas/templateSchema";

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
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/templates/get?domain=${domain}`;
      const response = await fetch(apiUrl, {
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
      console.error('Fetch error:', error);
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

  ,
  /**
   * Create a new template
   * @param templateData - The template data to create
   * @returns Promise<{ error?: Error, template?: Template, domain?: Domain }>
   */
  async createTemplate(templateData: TemplateFormData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/templates/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateData)
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'An error occurred while creating the template' };
      }

      return {
        template: data.template,
        domain: data.domain
      };
    } catch (error) {
      console.error('Create template error:', error);
      return { error };
    }
  }
};