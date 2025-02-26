import { TemplateFormData } from '@/schemas/templateSchema';
import dynamic from 'next/dynamic';

const templates = {
  minimal: dynamic(() => import('@/components/templats/minimal')),
  pro: dynamic(() => import('@/components/templats/pro')),
  basic: dynamic(() => import('@/components/templats/basic')),
  standard: dynamic(() => import('@/components/templats/standard')),
  complet: dynamic(() => import('@/components/templats/complet')),
  terminal: dynamic(() => import('@/components/templats/terminal'))
} as const;

type TemplateType = keyof typeof templates;

export const TemplateViews = ({
  type,
  templateData
}: {
  type: TemplateType,
  templateData: TemplateFormData
}) => {
  const Template = templates[type];
  return <Template templateData={templateData} />;
}