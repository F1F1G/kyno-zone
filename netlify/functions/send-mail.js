// netlify/functions/send-mail.js
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body);

    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer mlsn.39040fb37f74efafd022492e115db75f0b8c550069e7dd7e5540ff63cb3b1da5", // <-- ukryj to w zmiennej środowiskowej później!
      },
      body: JSON.stringify({
        from: {
          email: "kontakt@kyno-zone.pl",
          name: "KynoZone Formularz",
        },
        to: [
          {
            email: "kynozone.contact@gmail.com",
            name: "KynoZone",
          },
        ],
        subject: "Nowa wiadomość z formularza kontaktowego",
        text: `Imię: ${data.name}\nEmail: ${data.email}\nTelefon: ${data.phone}\nUsługa: ${data.service}\nWiadomość:\n${data.message}`,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: errorBody }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "OK" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
