const sgMail = require('@sendgrid/mail');

// SendGrid API key'i environment variable'dan al
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * Welcome email gönder (yeni kayıt)
 */
const sendWelcomeEmail = async (email, username, eventType) => {
  const eventTypeNames = {
    wedding: 'Düğün',
    engagement: 'Nişan',
    corporate: 'Kurumsal Etkinlik',
    circumcision: 'Sünnet',
    birthday: 'Doğum Günü',
    graduation: 'Mezuniyet',
    'baby-shower': 'Baby Shower'
  };

  const msg = {
    to: email,
    from: process.env.EMAIL_FROM || 'noreply@davet.digital',
    subject: 'DAVET.digital\'e Hoş Geldiniz! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hoş Geldiniz</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f7fafc;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f7fafc; padding: 40px 0;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700;">
                      DAVET<span style="font-weight: 400;">.digital</span>
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                      Dijital Davetiye ve Etkinlik Yönetimi
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #2d3748; font-size: 24px; font-weight: 600;">
                      Hoş Geldiniz, ${username}! 👋
                    </h2>

                    <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                      <strong>${eventTypeNames[eventType] || 'Etkinlik'}</strong> için DAVET.digital ailesine katıldığınız için teşekkür ederiz!
                    </p>

                    <p style="margin: 0 0 24px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                      Artık 30 gün boyunca tüm premium özellikleri <strong>ücretsiz</strong> kullanabilirsiniz:
                    </p>

                    <div style="background-color: #edf2f7; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                      <ul style="margin: 0; padding-left: 20px; color: #2d3748;">
                        <li style="margin-bottom: 12px; font-size: 15px;">✨ Premium Temalar - Etkinliğinize özel tasarımlar</li>
                        <li style="margin-bottom: 12px; font-size: 15px;">📸 Canlı Fotoğraf Duvarı - Gerçek zamanlı paylaşım</li>
                        <li style="margin-bottom: 12px; font-size: 15px;">📱 QR Kod Sistemi - Kolay fotoğraf yükleme</li>
                        <li style="margin-bottom: 12px; font-size: 15px;">👥 RSVP Yönetimi - Misafir takibi</li>
                        <li style="margin-bottom: 12px; font-size: 15px;">⏰ Geri Sayım Sayacı - Heyecanı artırın</li>
                        <li style="margin-bottom: 0; font-size: 15px;">📊 Detaylı Raporlar ve İstatistikler</li>
                      </ul>
                    </div>

                    <div style="text-align: center; margin: 32px 0;">
                      <a href="https://www.davet.digital/login" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                        Hemen Başlayın
                      </a>
                    </div>

                    <div style="background-color: #fff5f5; border-left: 4px solid #f56565; padding: 16px; border-radius: 4px; margin-top: 24px;">
                      <p style="margin: 0; color: #742a2a; font-size: 14px;">
                        <strong>💡 İpucu:</strong> Giriş yaptıktan sonra tema seçimi yaparak başlayabilirsiniz. İhtiyacınız olursa destek ekibimiz her zaman yanınızda!
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f7fafc; padding: 24px; text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #718096; font-size: 14px;">
                      Sorularınız mı var?
                    </p>
                    <p style="margin: 0; color: #718096; font-size: 14px;">
                      <a href="mailto:destek@davet.digital" style="color: #667eea; text-decoration: none;">destek@davet.digital</a> adresinden bize ulaşabilirsiniz.
                    </p>
                    <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                      <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                        © 2024 DAVET.digital - Tüm hakları saklıdır.
                      </p>
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  };

  try {
    if (process.env.SENDGRID_API_KEY) {
      await sgMail.send(msg);
      console.log(`Welcome email sent to ${email}`);
    } else {
      console.log('SendGrid API key not configured. Email would be sent to:', email);
      console.log('Subject:', msg.subject);
    }
  } catch (error) {
    console.error('Error sending welcome email:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

/**
 * Şifre sıfırlama email'i gönder
 */
const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `https://www.davet.digital/reset-password?token=${resetToken}`;

  const msg = {
    to: email,
    from: process.env.EMAIL_FROM || 'noreply@davet.digital',
    subject: 'Şifre Sıfırlama Talebi - DAVET.digital 🔒',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f7fafc;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f7fafc; padding: 40px 0;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 16px; overflow: hidden;">

                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 32px;">DAVET.digital</h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #2d3748; font-size: 24px;">Şifre Sıfırlama</h2>

                    <p style="margin: 0 0 16px 0; color: #4a5568; font-size: 16px;">
                      Şifrenizi sıfırlamak için bir talepte bulundunuz. Aşağıdaki butona tıklayarak yeni şifrenizi belirleyebilirsiniz.
                    </p>

                    <div style="text-align: center; margin: 32px 0;">
                      <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px;">
                        Şifremi Sıfırla
                      </a>
                    </div>

                    <div style="background-color: #fff5f5; border-left: 4px solid #f56565; padding: 16px; border-radius: 4px;">
                      <p style="margin: 0; color: #742a2a; font-size: 14px;">
                        <strong>⚠️ Önemli:</strong> Bu link 1 saat sonra geçersiz olacaktır. Eğer bu talebi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.
                      </p>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="background-color: #f7fafc; padding: 24px; text-align: center;">
                    <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                      © 2024 DAVET.digital
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  };

  try {
    if (process.env.SENDGRID_API_KEY) {
      await sgMail.send(msg);
      console.log(`Password reset email sent to ${email}`);
    } else {
      console.log('SendGrid API key not configured. Password reset email would be sent to:', email);
    }
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail
};
