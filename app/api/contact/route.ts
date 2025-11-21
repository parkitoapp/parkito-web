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
            from: `"${name} ${surname}" <${from}>`,
            to: "help@parkito.app",
            subject,
            text: `${body}\n\nTelefono: ${phone || "N/A"}`,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
    }
}
