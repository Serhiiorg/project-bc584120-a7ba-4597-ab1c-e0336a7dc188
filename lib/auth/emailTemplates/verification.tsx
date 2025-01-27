import mjml2html from 'mjml'
  import { logoImgAsString } from './logoString'
  
  const options = {
    // minify: true,
  }
  
  const emailTemplate = (vars: {
    name: string
    contactEmail: string
    loginUrl: string
  }) =>
    mjml2html(
      `<mjml>
    <mj-body background-color="#ffffff">
      <mj-section>
        <mj-column width="20%" padding="0px">
          <mj-image padding="0px 20px" width="300px" src='${logoImgAsString}' />
        </mj-column>
        <mj-column padding="0px" width="80%">
          <mj-text color="#1f1f1f" padding="0px" font-family="Times">
            <h1 style="font-size: 30px; margin:0px;">Welcome to Kindgi Viz</h1>
            <p style="font-size: 16px; font-weight: bold;">Bridging the gap between no-code platforms and traditional coding.</p>
            <p style="font-size: 14px; line-height: 1.25rem;margin:0;">
              You are receiving this email because you signed up at viz.kindgi.com.
            </p>
              <p style="font-size: 14px; line-height: 1.25rem;margin: 0 0 1rem 0;">
              If you have any issues, or if you think you received this email by accident please reach out to us at <span style="font-weight:bold;letter-spacing:1px;">'${vars.contactEmail}'</span>
            </p>
          </mj-text>
          <mj-button align="center" background-color="#1f1f1f" padding="0" width="250px" font-family="Times" href='${vars.loginUrl}'>
            Take me to Kindgi
          </mj-button>
        </mj-column>
      </mj-section>
  
    </mj-body>
  </mjml>`
     , options
    )
  
  export function generateEmail(vars: {
    name: string
    contactEmail: string
    loginUrl: string
  }) {
    let html = emailTemplate(vars).html
    return html
  }
  