import { TemplateFormData } from '@/schemas/templateSchema';
import dynamic from 'next/dynamic';

const Minimal = dynamic(() => import('@/components/templats/minimal'))
const Pro = dynamic(() => import('@/components/templats/pro'))
const Basic = dynamic(() => import('@/components/templats/basic'))
const Standard = dynamic(() => import('@/components/templats/standard'))
const Complet = dynamic(() => import('@/components/templats/complet'))
const Terminal = dynamic(() => import('@/components/templats/terminal'))

export const TemplatePreview = ({ type, templateData }: { type: string, templateData: TemplateFormData }) => {
  return (
    <>
      {type === 'minimal' && <Minimal templateData={templateData} />}
      {type === 'pro' && <Pro templateData={templateData} />}
      {type === 'basic' && <Basic templateData={templateData} />}
      {type === 'standard' && <Standard templateData={templateData} />}
      {type === 'complet' && <Complet templateData={templateData} />}
      {type === 'terminal' && <Terminal templateData={templateData} />}
    </>
  )
}