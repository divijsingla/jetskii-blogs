
import BlogLayout from "@/components/BlogLayout";
import MarkdownPreview from '@uiw/react-markdown-preview';
import booksContent from '../blogs/01_books.md?raw';

const BooksPage = () => {
  return (
    <BlogLayout>
      <div className="max-w-2xl px-2 py-4 ml-0">
        <div className="prose max-w-none text-base font-mono text-foreground bg-transparent w-full" style={{ fontFamily: 'inherit', color: 'inherit', fontSize: '1rem' }}>
          <div className="w-full" style={{ maxWidth: '70rem' }}>
            <MarkdownPreview 
              source={booksContent} 
              style={{ background: 'transparent', fontFamily: 'inherit', color: 'inherit', fontSize: '1rem' }}
              className="!bg-transparent !text-foreground !font-mono !text-base"
              components={{
                hr: (props) => (
                  <hr
                    style={{
                      border: "0.5px solid #000", // thin black line
                      margin: "1rem 0"
                    }}
                    {...props}
                  />),
              }}
            />
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default BooksPage;
