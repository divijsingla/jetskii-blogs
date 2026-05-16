import React from "react";
import BlogLayout from "@/components/BlogLayout";
import { useStaticmanSubmit } from "@/hooks/useStaticmanSubmit";
import { assetUrl } from "@/lib/assets";

const bookCovers = [
  { src: 'book_covers/the_stranger.jpg', alt: "The Stranger, Albert Camus", reading: true },
  { src: 'book_covers/horrible_science.jpg', alt: "Horrible Science: Space, Stars and Slimy Aliens, Nick Arnold" },
  { src: 'book_covers/peter_atkins.jpg', alt: "Atkin's Physical Chemistry, Peter William Atkins", reading: true },
  { src: 'book_covers/paul_hoffman_erdos.jpg', alt: "The Man Who Loved Only Numbers, Paul Hoffman", reading: true },
  { src: 'book_covers/mastery.jpg', alt: "Mastery, Robert Greene" },
  { src: 'book_covers/almanack.jpg', alt: "The Almanack of Naval Ravikant, Eric Jorgenson" },
  { src: 'book_covers/cant_hurt_me.jpg', alt: "Can't Hurt Me, David Goggins" },
  { src: 'book_covers/shoe_dog.jpg', alt: "Shoe Dog, Phil Knight", reading: true },
];

const childhoodBooks = [
  { src: 'book_covers/brief_history_of_time.jpg', alt: 'A Brief History of Time, Stephen Hawkings' },
  { src: 'book_covers/my_inventions.jpg', alt: 'My Inventions, Nikola Tesla' },
  { src: 'book_covers/a_wild_west_ride.jpg', alt: 'Magic Tree House, Mary Pope Osborne (A Wild West Ride, etc.)' },
  { src: 'book_covers/horrible_science_evil.jpg', alt: 'Horrible Science, Nick Arnold (some books of this series)' },
];


// --- Book Recommendation Form Component ---
function BookRecommendationForm() {
  const [recommendation, setRecommendation] = React.useState("");
  const { status, error, submit } = useStaticmanSubmit();
  const loading = status === "loading";
  const submitted = status === "submitted";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit({
      slug: "book-recommendations",
      name: "BOOK RECOMMENDATION",
      message: recommendation,
    });
  };

  if (loading) {
    return (
      <div className="p-4 bg-brand-95 text-brand-20 border border-brand-40 rounded mb-8">
        <div className="w-full h-2 mb-3 bg-brand-85 rounded overflow-hidden">
          <div className="h-full bg-brand-40 animate-loading-bar" style={{ width: '100%' }}></div>
        </div>
        <span>Sending your rec to the server gods...</span>
      </div>
    );
  }
  if (submitted) {
    return (
      <div className="p-4 bg-brand-90 text-brand-20 border border-brand-40 rounded mb-8">
        Got it, I'll check it out for sure! Thanks!
      </div>
    );
  }
  return (
    <form className="mb-8 flex flex-col gap-2" onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="book-recommendation" className="font-semibold text-brand">Anonymous Book Recommendations!</label>
      <div className="flex flex-row gap-2 w-full">
        <input
          id="book-recommendation"
          type="text"
          value={recommendation}
          onChange={e => setRecommendation(e.target.value)}
          placeholder="Recommend a book, any book."
          className="border border-brand-80 rounded px-3 py-2 w-full sm:w-[32rem] focus:outline-none focus:ring-2 focus:ring-brand-60"
          required
        />
        <button
          type="submit"
          className="bg-brand hover:bg-brand-25 text-white px-4 py-2 rounded transition-colors"
        >
          Submit
        </button>
      </div>
      <div className="mt-1 text-xs italic text-muted-foreground">
        You can include your name or a reason in the same field if you want. Or keep it mysterious. Randomness is welcome.
      </div>
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </form>
  );
}

const BooksPage = () => {
  return (
    <BlogLayout>
      <div className="max-w-4xl px-2 py-8">
        <BookRecommendationForm />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 justify-start mb-8">
          {bookCovers.map((book, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img
                src={assetUrl(book.src)}
                alt={book.alt}
                className="w-full max-w-[160px] aspect-[3/4] object-cover rounded-2xl shadow border-2 border-brand-80 bg-white"
              />
              {book.reading && (
                <span className="mt-1 px-2 py-0.5 text-xs rounded-full italic text-brand font-semibold">reading</span>
              )}
            </div>
          ))}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <h2 className="text-lg mb-2 text-brand">Read long time back in childhood</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 justify-start">
          {childhoodBooks.map((book, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img
                src={assetUrl(book.src)}
                alt={book.alt}
                className="w-full max-w-[160px] aspect-[3/4] object-cover rounded-2xl shadow border-2 border-brand-80 bg-white"
              />
              {(book.alt.includes('Magic Tree House') || book.alt.includes('Horrible Science')) && (
                <span className="mt-1 text-xs italic text-muted-foreground text-center">Read a lot of books of this series</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </BlogLayout>
  );
};

export default BooksPage;
