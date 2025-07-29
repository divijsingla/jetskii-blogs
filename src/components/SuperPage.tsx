import BlogLayout from "@/components/BlogLayout";
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Link } from "react-router-dom";

interface SuperPageProps {
  isHome?: boolean;
  title?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  content?: string;
  children?: React.ReactNode;
}

const base = import.meta.env.BASE_URL;

const SuperPage = ({
  isHome = false,
  title,
  date,
  readTime,
  tags,
  content,
  children
}: SuperPageProps) => {
  return (
    <BlogLayout>
      <div className="max-w-2xl px-2 py-4 ml-0">
        {/* Top Image */}
        <img src={`${base}assets/heading.png`} alt="Heading" className="w-full max-w-xl mb-4 opacity-5" />
        <div className="flex gap-0 mb-2">
          <img src={`${base}assets/drawing.jpeg`} alt="Visual" className="w-72 h-72 object-cover opacity-100" />
        </div>
        {/* Home Page Content */}
        {isHome ? (
          <div className="space-y-1 text-base">
            {children}
          </div>
        ) : (
          <>
            {/* Blog Title */}
            {title && (
              <h1 className="text-3xl font-bold text-[hsl(24,60%,30%)] mb-2">{title}</h1>
            )}
            {/* Blog Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-2">
              {date && (
                <div className="text-sm text-muted-foreground">
                  <time dateTime={date}>{date}</time>
                </div>
              )}
              {/* {readTime && (
                <span className="text-sm text-muted-foreground">{readTime}</span>
              )} */}
            </div>
            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-1 text-sm mb-4">
                <span className="mr-1 text-[hsl(24,60%,30%)]">tags:</span>
                {tags.map((tag) => (
                  <code
                    key={tag}
                    className="geek-tag px-1 py-1 rounded text-sm transition-all duration-200 text-[hsl(24,60%,30%)] border-[hsl(24,60%,30%)]"
                  >
                    {tag}
                  </code>
                ))}
              </div>
            )}
            {/* Blog Content */}
            {content && (
              <div 
                className="prose max-w-none text-base font-mono text-foreground bg-transparent w-full"
                style={{ fontFamily: 'inherit', color: 'inherit', fontSize: '1rem' }}
              >
                <div className="w-full" style={{ maxWidth: '70rem' }}>
                  <MarkdownPreview 
                    source={content} 
                    style={{ background: 'transparent', fontFamily: 'inherit', color: 'inherit', fontSize: '1rem' }}
                    className="!bg-transparent !text-foreground !font-mono !text-base"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </BlogLayout>
  );
};

export default SuperPage;
