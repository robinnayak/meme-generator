import Header from "@/components/global/Header";

export default function FAQ() {
    const faqs = [
        {
            question: "How do I create a meme?",
            answer: "Creating a meme is simple! Just follow these steps:\n1. Upload your image or choose from available templates\n2. Click 'Add Text' to add text boxes\n3. Type your text and customize its position\n4. Adjust font settings as needed\n5. Click 'Download' to save your meme"
        },
        {
            question: "Can I add multiple text boxes?",
            answer: "Yes! You can add as many text boxes as you need. Simply click the 'Add Text' button for each new text box you want to add. Each text box can be positioned and styled independently."
        },
        {
            question: "How do I edit existing text?",
            answer: "To edit existing text:\n1. Click on the text box you want to edit in the preview area\n2. The text editor panel will show the current text content\n3. Make your changes in the text input field\n4. The changes will appear in real-time in the preview\n5. You can also adjust the font settings while editing"
        },
        {
            question: "How do I delete text from my meme?",
            answer: "There are two ways to delete text:\n1. Using the delete button:\n   - Click on the text you want to remove\n   - Click the delete (trash) icon next to the text in the editor panel\n2. Using keyboard:\n   - Select the text box you want to remove\n   - Press the Delete or Backspace key on your keyboard"
        },
        {
            question: "How do I customize text position?",
            answer: "You can drag and drop text boxes anywhere on the image. Click and hold on a text box, then move it to your desired position. The changes will be reflected in real-time in the preview."
        },
        {
            question: "What font options are available?",
            answer: "You can customize various font properties including:\n- Font size\n- Font color\n- Text alignment\n- Bold and italic styles"
        },
        {
            question: "How do I download my meme?",
            answer: "Once you're happy with your meme, simply click the 'Download' button. Your meme will be saved as a high-quality image file to your device."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Header heading="Frequently Asked Questions" subheading="" />
            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                        <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}