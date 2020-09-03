import { sendEmail } from './email/email-sender';
var fs = require('fs');

export async function sendStandardTemplateEmail(email:string, subject:string, details:string){       
    await sendEmail(email, subject, getStandardTemplateEmail(details));
}
export function getStandardTemplateEmail(details:string) : string{
    let html = fs.readFileSync(`${__dirname}/email/standard_template.html`, 'utf8');
    html = html.replace('{details}', details);
    html = html.replace(/{poker_site_name}/g, process.env.POKER_SITE_NAME);    
    html = html.replace('{year}', new Date().getFullYear());
    html = html.replace('{cdn}', process.env.POKER_CDN);
    return html;
}