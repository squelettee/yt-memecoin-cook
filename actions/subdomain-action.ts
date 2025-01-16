/**
 * Actions to handle subdomain-related API calls
 */

import { subdomainErrors } from "@/schemas/subdomainSchema";

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
        return { error: data.error };
      }

      return { subdomain: data.subdomain };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return { error: subdomainErrors.connection };
    }
  },
}; 