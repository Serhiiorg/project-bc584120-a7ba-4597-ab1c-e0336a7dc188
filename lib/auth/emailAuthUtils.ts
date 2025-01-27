
  import { SendVerificationRequestParams } from "next-auth/providers/email";
  import nodemailer from "nodemailer"
  import { generateEmail } from "./emailTemplates/verification";
  
  export async function sendVerificationRequest(params: SendVerificationRequestParams) {
  
    const { identifier: email, url, provider, theme } = params
    const { host } = new URL(url)
    const transport = nodemailer.createTransport(params.provider.server)
  
    const emailHtml = generateEmail({
       name: 'Kindgi Viz',
      contactEmail: 'contact@kindgi.com',
      loginUrl: url,
  })
  
    const result = await transport.sendMail({
      to: email,
      from: provider.from,
      subject: "Welcome to Kindgi Viz",
      text: text({ url, host }),
      html: emailHtml,
    })
    console.log('sendMail result', result)
    const failed = result.rejected.concat(result.pending).filter(Boolean)
    if (failed.length) {
      throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
    }
  }
  
  function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}${url}`
  }
  