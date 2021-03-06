const templateNames = {
  PASSWORD_RESET: 'passwordReset',
  REGISTRATION: 'registration',
};

const templates = {
  'en': {
    [templateNames.REGISTRATION]: ({ link, expiresInMinutes }) => ({
      subject: 'Finish your registration to Daisy',
      content: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
          </head>
          <body>
            Hi there,<br>
            <br>
            To finish your registration click <a href="${link}" target="_blank" data-registration-link>here</a>.<br>
            <br>
            <i>The above link expires in ${expiresInMinutes} minutes from the sending of this mail.</i><br>
            <br>
            Best regards,<br>
            <strong>The Daisy Team</strong>
          </body>
        </html>
      `,
    }),
    [templateNames.PASSWORD_RESET]: ({ link, expiresInMinutes }) => ({
      subject: 'Reset your password for Daisy',
      content: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
          Hi there,<br>
          <br>
          To reset your password, click <a href="${link}" target="_blank" data-password-reset-link>here</a><br>
          <br>
          <i>The above link expires in ${expiresInMinutes} minutes from the sending of this mail.</i><br>
          <br>
          Best regards,<br>
          <strong>The Daisy Team</strong>
        </body>
      </html>
      `,
    }),
  },

  'hu': {
    [templateNames.REGISTRATION]: ({ link, expiresInMinutes }) => ({
      subject: 'TODO: Finish your registration to Daisy',
      content: `
        <!DOCTYPE html>
        <html lang="hu">
        </html>
      `,
    }),
    [templateNames.PASSWORD_RESET]: ({ link, expiresInMinutes }) => ({
      subject: 'TODO: Reset your password for Daisy',
      content: `
        <!DOCTYPE html>
        <html lang="hu">
        </html>
      `,
    }),
  },
};

module.exports = {
  templateNames,
  templates,
};
