import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { from, name, surname, phone, subject, body } = await req.json();

        if (!from || !name || !surname || !subject || !body) {
            return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_USER, // Use authenticated SMTP user as sender
            replyTo: `"${name} ${surname}" <${from}>`, // Set user's email as reply-to
            to: process.env.RECEIVER_EMAIL,
            subject: `Nuovo messaggio dal form di contatto: ${subject}`,
            html: `
        <h2>Nuovo messaggio da:</h2>
        <p><b>Nome:</b> ${name} ${surname}</p>
        <p><b>Email:</b> ${from}</p>
        <p><b>Telefono:</b> ${phone}</p>
        <p><b>Messaggio:</b><br/>${body}</p>
        `,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
    }
}
