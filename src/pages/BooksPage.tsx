import React from "react";
import BlogLayout from "@/components/BlogLayout";
const base = import.meta.env.BASE_URL;
const bookCovers = [
  // Add your book cover filenames here as you upload them
  { src: '/assets/book_covers/the_stranger.jpg', alt: "The Stranger, Albert Camus", reading: true },
  { src: '/assets/book_covers/horrible_science.jpg', alt: "Horrible Science: Space, Stars and Slimy Aliens, Nick Arnold" },
  { src: '/assets/book_covers/peter_atkins.jpg', alt: "Atkin's Physical Chemistry, Peter William Atkins", reading: true },
  { src: '/assets/book_covers/paul_hoffman_erdos.jpg', alt: "The Man Who Loved Only Numbers, Paul Hoffman", reading: true },
  { src: '/assets/book_covers/mastery.jpg', alt: "Mastery, Robert Greene" },
  { src: '/assets/book_covers/almanack.jpg', alt: "The Almanack of Naval Ravikant, Eric Jorgenson" },
  { src: `/assets/book_covers/cant_hurt_me.jpg`, alt: "Can't Hurt Me, David Goggins" },
  { src: `/assets/book_covers/shoe_dog.jpg`, alt: "Shoe Dog, Phil Knight", reading: true },
  // Add more as needed
];

const childhoodBooks = [
  { src: '/assets/book_covers/brief_history_of_time.jpg', alt: 'A Brief History of Time, Stephen Hawkings' },
  { src: '/assets/book_covers/my_inventions.jpg', alt: 'My Inventions, Nikola Tesla' },
  { src: '/assets/book_covers/a_wild_west_ride.jpg', alt: 'Magic Tree House, Mary Pope Osborne (A Wild West Ride, etc.)' },
  { src: '/assets/book_covers/horrible_science_evil.jpg', alt: 'Horrible Science, Nick Arnold (some books of this series)' },
];


// --- Book Recommendation Form Component ---
function BookRecommendationForm() {
  const [recommendation, setRecommendation] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSubmitted(false);
    const actionUrl = `https://staticman-g2u2.onrender.com/v3/entry/github/divijsingla/jetskii-blogs/main/comments`;
    const body = JSON.stringify({
      fields: {
        name: "BOOK RECOMMENDATION", // No separate name field
        email: "", // not used
        message: recommendation
      },
      options: {
        slug: "book-recommendations"
      }
    });
    try {
      const res = await fetch(actionUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      if (res.ok) {
        setSubmitted(true);
        setRecommendation("");
      } else {
        setError("Failed to submit recommendation. Please try again later.");
      }
    } catch (err) {
      setError("Failed to submit recommendation. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 bg-[hsl(24,60%,95%)] text-[hsl(24,60%,20%)] border border-[hsl(24,60%,40%)] rounded mb-8">
        <div className="w-full h-2 mb-3 bg-[hsl(24,60%,85%)] rounded overflow-hidden">
          <div className="h-full bg-[hsl(24,60%,40%)] animate-loading-bar" style={{ width: '100%' }}></div>
        </div>
        <span>Sending your rec to the server gods...</span>
      </div>
    );
  }
  if (submitted) {
    return (
      <div className="p-4 bg-[hsl(24,60%,90%)] text-[hsl(24,60%,20%)] border border-[hsl(24,60%,40%)] rounded mb-8">
        Got it, I'll check it out for sure! Thanks!
      </div>
    );
  }
  return (
    <form className="mb-8 flex flex-col gap-2" onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="book-recommendation" className="font-semibold text-[hsl(24,60%,30%)]">Anonymous Book Recommendations!</label>
      <div className="flex flex-row gap-2 w-full">
        <input
          id="book-recommendation"
          type="text"
          value={recommendation}
          onChange={e => setRecommendation(e.target.value)}
          placeholder="Recommend a book, any book!"
          className="border border-[hsl(24,60%,80%)] rounded px-3 py-2 w-full sm:w-[32rem] focus:outline-none focus:ring-2 focus:ring-[hsl(24,60%,60%)]"
          required
        />
        <button
          type="submit"
          className="bg-[hsl(24,60%,30%)] hover:bg-[hsl(24,60%,25%)] text-white px-4 py-2 rounded transition-colors"
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
                src={`${base}${book.src}`}
                alt={book.alt}
                className="w-full max-w-[160px] aspect-[3/4] object-cover rounded-2xl shadow border-2 border-[hsl(24,60%,80%)] bg-white"
              />
              {book.reading && (
                <span className="mt-1 px-2 py-0.5 text-xs rounded-full italic text-[hsl(24,60%,30%)] font-semibold">reading</span>
              )}
            </div>
          ))}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <h2 className="text-lg mb-2 text-[hsl(24,60%,30%)]">Read long time back in childhood</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 justify-start">
          {childhoodBooks.map((book, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img
                src={`${base}${book.src}`}
                alt={book.alt}
                className="w-full max-w-[160px] aspect-[3/4] object-cover rounded-2xl shadow border-2 border-[hsl(24,60%,80%)] bg-white"
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
