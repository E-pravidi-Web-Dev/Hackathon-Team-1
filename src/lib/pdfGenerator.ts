import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    quantity?: number;
}

interface QuotationData {
    products: Product[];
    customerName: string;
    companyName?: string;
    quotationNumber?: string;
    validUntil?: string;
    createdAt?: Date;
}

export async function generateQuotationPDF(data: QuotationData): Promise<Buffer> {
    const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        bufferPages: true
    });

    // Collect the PDF pages into a buffer
    return new Promise((resolve) => {
        const chunks: Buffer[] = [];
        doc.on('data', chunks.push.bind(chunks));
        doc.on('end', () => resolve(Buffer.concat(chunks)));

        // Add company logo/header
        doc.fontSize(25)
            .text('Quotation', { align: 'center' })
            .moveDown();

        // Add quotation details
        doc.fontSize(12);
        doc.text(`Date: ${data.createdAt ? new Date(data.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}`);
        if (data.quotationNumber) {
            doc.text(`Quotation Number: ${data.quotationNumber}`);
        }
        doc.text(`Customer: ${data.customerName}`);
        if (data.companyName) {
            doc.text(`Company: ${data.companyName}`);
        }
        if (data.validUntil) {
            doc.text(`Valid Until: ${data.validUntil}`);
        }
        doc.moveDown();

        // Products table header
        const startX = 50;
        let currentY = doc.y;
        
        // Table header background
        doc.fill('#f0f0f0')
           .rect(startX, currentY, 495, 20)
           .fill();

        // Table headers
        doc.fill('black')
           .text('Product', startX + 10, currentY + 5)
           .text('Description', startX + 150, currentY + 5)
           .text('Price', startX + 350, currentY + 5)
           .text('Quantity', startX + 400, currentY + 5)
           .text('Total', startX + 450, currentY + 5);

        currentY += 30;

        // Products
        let total = 0;
        for (const product of data.products) {
            const quantity = product.quantity || 1;
            const itemTotal = product.price * quantity;
            total += itemTotal;

            // Check if we need a new page
            if (currentY > doc.page.height - 150) {
                doc.addPage();
                currentY = 50;
            }

            try {
                if (product.imageUrl) {
                    // Add product image
                    doc.image(product.imageUrl, startX + 10, currentY, {
                        width: 50,
                        height: 50,
                        fit: [50, 50]
                    });
                }
            } catch (error) {
                console.error('Error loading image:', error);
            }

            // Product details
            doc.fontSize(10)
               .text(product.name, startX + 70, currentY)
               .text(product.description, startX + 150, currentY, {
                   width: 180,
                   height: 50
               })
               .text(`$${product.price.toFixed(2)}`, startX + 350, currentY)
               .text(quantity.toString(), startX + 400, currentY)
               .text(`$${itemTotal.toFixed(2)}`, startX + 450, currentY);

            currentY += 60; // Height for each product row
        }

        // Total section
        doc.fontSize(12)
           .moveDown()
           .text(`Total Amount: $${total.toFixed(2)}`, { align: 'right' });

        // Footer
        doc.fontSize(10)
           .moveDown(2)
           .text('Thank you for your business.', { align: 'center' })
           .moveDown()           .fillColor('grey')
           .text('This is a computer-generated document. No signature is required.', {
               align: 'center'
           });

        doc.end();
    });
}

// Convert Buffer to Readable Stream
export function bufferToStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}
