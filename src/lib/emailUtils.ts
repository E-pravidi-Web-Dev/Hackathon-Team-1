import nodemailer from 'nodemailer';

// Configure nodemailer with email service settings
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

interface Product {
    name: string;
    price: number;
    quantity: number;
}

interface QuotationEmailData {
    products: Product[];
    customerName: string;
    companyName?: string;
    quotationNumber?: string;
    validUntil?: string;
}

export const generateQuotationEmailHtml = ({
    products,
    customerName,
    companyName,
    quotationNumber,
    validUntil,
}: QuotationEmailData) => {
    const total = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const date = new Date().toLocaleDateString();

    return `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
            <div style="text-align: center; padding: 20px; background-color: #f8f9fa; margin-bottom: 20px;">
                <h1 style="color: #2c3e50; margin: 0;">Quotation</h1>
            </div>
            
            <div style="margin-bottom: 30px;">
                <p><strong>Date:</strong> ${date}</p>
                ${quotationNumber ? `<p><strong>Quotation Number:</strong> ${quotationNumber}</p>` : ''}
                <p><strong>To:</strong> ${customerName}</p>
                ${companyName ? `<p><strong>Company:</strong> ${companyName}</p>` : ''}
                ${validUntil ? `<p><strong>Valid Until:</strong> ${validUntil}</p>` : ''}
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <thead>
                    <tr style="background-color: #f8f9fa;">
                        <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6;">Product</th>
                        <th style="padding: 12px; text-align: right; border: 1px solid #dee2e6;">Price</th>
                        <th style="padding: 12px; text-align: right; border: 1px solid #dee2e6;">Quantity</th>
                        <th style="padding: 12px; text-align: right; border: 1px solid #dee2e6;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(product => `
                        <tr>
                            <td style="padding: 12px; border: 1px solid #dee2e6;">${product.name}</td>
                            <td style="padding: 12px; text-align: right; border: 1px solid #dee2e6;">$${product.price.toFixed(2)}</td>
                            <td style="padding: 12px; text-align: right; border: 1px solid #dee2e6;">${product.quantity}</td>
                            <td style="padding: 12px; text-align: right; border: 1px solid #dee2e6;">$${(product.price * product.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr style="background-color: #f8f9fa;">
                        <td colspan="3" style="padding: 12px; text-align: right; border: 1px solid #dee2e6;"><strong>Total:</strong></td>
                        <td style="padding: 12px; text-align: right; border: 1px solid #dee2e6;"><strong>$${total.toFixed(2)}</strong></td>
                    </tr>
                </tfoot>
            </table>

            <div style="color: #6c757d; font-size: 14px;">
                <p>Thank you for your interest in our products. If you have any questions about this quotation, please don't hesitate to contact us.</p>
            </div>
        </div>
    `;
};

export const sendQuotationEmail = async (to: string, subject: string, quotationData: QuotationEmailData) => {
    const htmlContent = generateQuotationEmailHtml(quotationData);

    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Quotation System" <quotations@example.com>',
            to,
            subject,
            html: htmlContent,
        });
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' };
    }
};
